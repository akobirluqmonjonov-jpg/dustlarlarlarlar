import os
import time
import uuid
import logging
from collections import OrderedDict
from typing import Dict

from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery, FSInputFile
from aiogram.filters import CommandStart, Command
from aiogram.enums import ChatAction

from config import SUPPORT_USERNAME, SUPPORT_URL, TEMP_DIR
from database import db
from services.downloader import clean_url, download_instagram_video, download_instagram_audio
from services.ffmpeg_helper import extract_audio_from_video_file
from utils.keyboards import (
    get_start_keyboard,
    get_video_audio_offer_keyboard,
    get_audio_ready_keyboard,
    get_file_audio_offer_keyboard,
    get_support_inline_keyboard
)
from utils.cleaner import safe_remove_file

logger = logging.getLogger(__name__)
user_router = Router()

# ============================================================
# XOTIRADAGI CHEKLANGAN KESH (MEMORY LEAKDAN HIMOYA)
# ============================================================
class LRUCache(OrderedDict):
    def __init__(self, maxsize=1000, *args, **kwargs):
        self.maxsize = maxsize
        super().__init__(*args, **kwargs)

    def __setitem__(self, key, value):
        super().__setitem__(key, value)
        if len(self) > self.maxsize:
            self.popitem(last=False)

# Instagram havolalarini saqlash uchun kesh (token -> clean_url)
URL_CACHE = LRUCache(maxsize=1000)

# Tayyorlangan audio fayllar yo'lini saqlash uchun kesh (token -> file_path)
AUDIO_FILE_CACHE = LRUCache(maxsize=500)

# Telegram video file_id larni saqlash uchun kesh (token -> file_id)
VIDEO_FILE_CACHE = LRUCache(maxsize=500)

# ============================================================
# STANDART XATOLIK MATNI
# ============================================================
STANDARD_ERROR_TEXT = (
    "⚠️ Afsuski, hozir bu faylni qayta ishlashda muammo yuz berdi.\n"
    "🔄 Birozdan keyin qayta urinib ko‘ring.\n"
    f"👨‍💻 Muammo davom etsa, admin bilan bog‘laning:\n"
    f"{SUPPORT_USERNAME}"
)

# ============================================================
# /start VA /help KOMANDALARI
# ============================================================
@user_router.message(CommandStart())
async def cmd_start(message: Message):
    """
    /start komandasi uchun chiroyli xush kelibsiz xabari
    """
    welcome_text = (
        "👋 Assalomu alaykum!\n"
        "🤖 Men Instagram videolarini qayta ishlashga yordam beruvchi botman.\n"
        "📎 Instagram video havolasini yuboring yoki video fayl jo‘nating.\n"
        "⚡ Tez va qulay ishlashga harakat qilaman."
    )
    await message.answer(welcome_text, reply_markup=get_start_keyboard())


@user_router.message(Command("help"))
async def cmd_help(message: Message):
    """
    /help komandasi bo'yicha yo'riqnoma
    """
    help_text = (
        "📌 Instagram video havolasini yuboring.\n"
        "📌 Yoki video fayl yuboring.\n"
        "📌 Video tayyor bo‘lgach, xohlasangiz audioni alohida olishingiz mumkin.\n"
        "📌 Muammo bo‘lsa admin bilan bog‘laning.\n\n"
        f"Admin:\n{SUPPORT_USERNAME}"
    )
    await message.answer(help_text, reply_markup=get_support_inline_keyboard())


@user_router.callback_query(F.data == "show_guide")
async def cb_show_guide(callback: CallbackQuery):
    """Qo'llanma tugmasi bosilganda"""
    help_text = (
        "📖 <b>Botdan foydalanish qo'llanmasi:</b>\n\n"
        "1️⃣ Instagram ilovasida kerakli Reels yoki Video havolasidan nusxa oling (Copy link).\n"
        "2️⃣ Ushbu botga havolani xabar sifatida yuboring.\n"
        "3️⃣ Bot videoni tezda yuklab beradi.\n"
        "4️⃣ Video tagida sizga audio kerakligi haqida so'rov chiqadi.\n"
        "5️⃣ '🎵 Musiqani olish' tugmasi orqali MP3 faylni yuklab olishingiz mumkin.\n"
        "6️⃣ Shuningdek, to'g'ridan-to'g'ri video fayl yuborsangiz ham, bot undan audioni ajratib beradi.\n\n"
        f"👨‍💻 Aloqa: {SUPPORT_USERNAME}"
    )
    await callback.message.answer(help_text, parse_mode="HTML", reply_markup=get_support_inline_keyboard())
    await callback.answer()


# ============================================================
# INSTAGRAM HAVOLASINI QAYTA ISHLASH (MATN XABARLARI)
# ============================================================
@user_router.message(F.text)
async def handle_text_message(message: Message, bot: Bot):
    """
    Matnli xabarni qabul qilish, Instagram URL tekshiruvi va yuklash
    """
    text = (message.text or "").strip()
    user_id = message.from_user.id
    start_time = time.time()

    # Instagram havolasini tekshirish
    url = clean_url(text)
    if not url:
        # Agar havolada instagram so'zi bo'lsa yoki noto'g'ri format bo'lsa
        await message.reply(
            "❌ Iltimos, Instagram video havolasini yuboring.",
            reply_markup=get_support_inline_keyboard()
        )
        return

    logger.info(f"Foydalanuvchi [{user_id}] havola yubordi: {url}")
    status_msg = await message.reply("⏳ Video tayyorlanmoqda...")
    await bot.send_chat_action(chat_id=message.chat.id, action=ChatAction.UPLOAD_VIDEO)

    video_path = None
    try:
        video_path, title, err = await download_instagram_video(url)

        if err or not video_path or not os.path.exists(video_path):
            raise Exception(err or "Video yuklab olinmadi")

        duration = time.time() - start_time
        logger.info(f"Video tayyor [{user_id}]: {video_path} ({duration:.2f}s)")

        # Videoni Telegram orqali yuborish
        bot_info = await bot.get_me()
        caption = f"🎬 <b>{title}</b>\n\n🤖 @{bot_info.username}"
        video_file = FSInputFile(video_path)

        await message.answer_video(
            video=video_file,
            caption=caption,
            parse_mode="HTML",
            request_timeout=300
        )

        # Status xabarini o'chirish
        try:
            await status_msg.delete()
        except Exception:
            pass

        # Statistikani yangilash
        await db.increment_video_count(user_id)
        await db.log_action(user_id, "download_video", "success", duration=duration)

        # Token yaratish va audio taklifini ko'rsatish
        token = uuid.uuid4().hex[:12]
        URL_CACHE[token] = url

        await message.answer(
            "🎵 Shu videodagi audio/musiqani alohida fayl qilib ham yuklab olmoqchimisiz?",
            reply_markup=get_video_audio_offer_keyboard(token)
        )

    except Exception as e:
        logger.error(f"Foydalanuvchi [{user_id}] uchun video yuklashda xato: {e}", exc_info=True)
        try:
            await status_msg.delete()
        except Exception:
            pass

        await db.increment_error_count(user_id)
        await db.log_action(user_id, "download_video", "error", str(e), duration=time.time() - start_time)

        await message.reply(
            STANDARD_ERROR_TEXT,
            reply_markup=get_support_inline_keyboard()
        )
    finally:
        # Yuklangan video faylini serverdan tozalash
        if video_path:
            await safe_remove_file(video_path)


# ============================================================
# AUDIO TAKLIFINI QAYTA ISHLASH (CALLBACK QUERY)
# ============================================================
@user_router.callback_query(F.data.startswith("get_audio:"))
async def cb_get_audio(callback: CallbackQuery):
    """
    '🎵 Musiqani olish' tugmasi bosilganda audioni tayyorlash
    """
    token = callback.data.split("get_audio:")[1]
    url = URL_CACHE.get(token)
    user_id = callback.from_user.id
    start_time = time.time()

    if not url:
        await callback.answer(
            "Ushbu so'rov muddati tugagan. Iltimos, havolani qaytadan yuboring.",
            show_alert=True
        )
        return

    try:
        await callback.message.edit_text("⏳ Audio tayyorlanmoqda...")
    except Exception:
        pass

    try:
        audio_path, title, err = await download_instagram_audio(url)
        if err or not audio_path or not os.path.exists(audio_path):
            raise Exception(err or "Audio yuklab olinmadi")

        # Audio tayyor bo'lgach keshga saqlash
        audio_token = uuid.uuid4().hex[:12]
        AUDIO_FILE_CACHE[audio_token] = (audio_path, title)

        # "🎵 Audio tayyor!" va 📥 "Yuklash" tugmasi
        await callback.message.edit_text(
            f"🎵 <b>Audio tayyor!</b>\n\n📌 <i>{title}</i>",
            parse_mode="HTML",
            reply_markup=get_audio_ready_keyboard(audio_token)
        )
        await callback.answer()

    except Exception as e:
        logger.error(f"Foydalanuvchi [{user_id}] uchun audio tayyorlashda xatolik: {e}", exc_info=True)
        await db.increment_error_count(user_id)
        await db.log_action(user_id, "extract_audio", "error", str(e), duration=time.time() - start_time)

        try:
            await callback.message.edit_text(
                STANDARD_ERROR_TEXT,
                reply_markup=get_support_inline_keyboard()
            )
        except Exception:
            pass
        await callback.answer()


@user_router.callback_query(F.data.startswith("send_audio:"))
async def cb_send_audio(callback: CallbackQuery, bot: Bot):
    """
    📥 'Yuklash' tugmasi bosilganda tayyor audio faylni Telegramga jo'natish
    """
    audio_token = callback.data.split("send_audio:")[1]
    cache_item = AUDIO_FILE_CACHE.get(audio_token)
    user_id = callback.from_user.id
    start_time = time.time()

    if not cache_item:
        await callback.answer(
            "Fayl muddati tugagan yoki allaqachon yuklangan. Iltimos, qayta urinib ko'ring.",
            show_alert=True
        )
        return

    audio_path, title = cache_item

    if not os.path.exists(audio_path):
        await callback.answer("Fayl topilmadi.", show_alert=True)
        return

    await callback.answer("📥 Audio yuborilmoqda...")
    await bot.send_chat_action(chat_id=callback.message.chat.id, action=ChatAction.UPLOAD_VOICE)

    try:
        bot_info = await bot.get_me()
        caption = f"🎵 <b>{title}</b>\n\n🤖 @{bot_info.username}"
        audio_file = FSInputFile(audio_path)

        await callback.message.reply_audio(
            audio=audio_file,
            caption=caption,
            parse_mode="HTML",
            title=title,
            performer="Instagram Audio",
            request_timeout=300
        )

        try:
            await callback.message.edit_text("✅ Audio muvaffaqiyatli yuklandi.")
        except Exception:
            pass

        await db.increment_audio_count(user_id)
        await db.log_action(user_id, "send_audio", "success", duration=time.time() - start_time)

    except Exception as e:
        logger.error(f"Audio faylni yuborishda xatolik [{user_id}]: {e}", exc_info=True)
        await db.increment_error_count(user_id)
        await callback.message.reply(
            STANDARD_ERROR_TEXT,
            reply_markup=get_support_inline_keyboard()
        )
    finally:
        # Audio faylni darhol o'chirish va keshdan olib tashlash
        AUDIO_FILE_CACHE.pop(audio_token, None)
        await safe_remove_file(audio_path)


@user_router.callback_query(F.data.startswith("cancel_audio:"))
async def cb_cancel_audio(callback: CallbackQuery):
    """❌ 'Kerak emas' tugmasi bosilganda"""
    token = callback.data.split("cancel_audio:")[1]
    URL_CACHE.pop(token, None)
    try:
        await callback.message.edit_text("Amal bekor qilindi. Yangi havola yuborishingiz mumkin! 👍")
    except Exception:
        pass
    await callback.answer("Bekor qilindi")


# ============================================================
# VIDEO FAYL YUBORILGANDA AUDIO AJRATISH
# ============================================================
@user_router.message(F.video)
async def handle_video_file(message: Message):
    """
    Foydalanuvchi to'g'ridan-to'g'ri video fayl yuborganida audio ajratishni taklif qilish
    """
    token = uuid.uuid4().hex[:12]
    VIDEO_FILE_CACHE[token] = message.video.file_id

    await message.reply(
        "🎵 Videodan audio ajrataymi?",
        reply_markup=get_file_audio_offer_keyboard(token)
    )


@user_router.callback_query(F.data.startswith("extract_vfile:"))
async def cb_extract_video_file(callback: CallbackQuery, bot: Bot):
    """
    '🎵 Ha, audio olish' bosilganda Telegramdan videoni yuklab olib, audiosini ajratib jo'natish
    """
    token = callback.data.split("extract_vfile:")[1]
    file_id = VIDEO_FILE_CACHE.get(token)
    user_id = callback.from_user.id
    start_time = time.time()

    if not file_id:
        await callback.answer("So'rov muddati tugagan.", show_alert=True)
        return

    try:
        await callback.message.edit_text("⏳ Audio tayyorlanmoqda...")
    except Exception:
        pass

    video_temp_path = str(TEMP_DIR / f"v_{token}.mp4")
    audio_temp_path = str(TEMP_DIR / f"a_{token}.mp3")

    try:
        # Telegramdan video faylni yuklab olish
        file_info = await bot.get_file(file_id)
        if not file_info.file_path:
            raise Exception("Telegram fayl yo'lini olib bo'lmadi")

        await bot.download_file(file_info.file_path, video_temp_path)

        # Videodan MP3 audio ajratish
        success = await extract_audio_from_video_file(video_temp_path, audio_temp_path)
        if not success or not os.path.exists(audio_temp_path):
            raise Exception("FFmpeg orqali audio ajratishda xatolik yuz berdi")

        # Telegramga audio qilib jo'natish
        bot_info = await bot.get_me()
        caption = f"🎵 <b>Videodan ajratilgan audio</b>\n\n🤖 @{bot_info.username}"
        audio_file = FSInputFile(audio_temp_path)

        await bot.send_chat_action(chat_id=callback.message.chat.id, action=ChatAction.UPLOAD_VOICE)
        await callback.message.reply_audio(
            audio=audio_file,
            caption=caption,
            parse_mode="HTML",
            title="Video Audio",
            performer="Video",
            request_timeout=300
        )

        try:
            await callback.message.edit_text("✅ Audio muvaffaqiyatli ajratildi va yuborildi!")
        except Exception:
            pass

        await db.increment_audio_count(user_id)
        await db.log_action(user_id, "extract_file_audio", "success", duration=time.time() - start_time)
        await callback.answer()

    except Exception as e:
        logger.error(f"Video fayldan audio ajratishda xatolik [{user_id}]: {e}", exc_info=True)
        await db.increment_error_count(user_id)
        await db.log_action(user_id, "extract_file_audio", "error", str(e), duration=time.time() - start_time)

        try:
            await callback.message.edit_text(
                STANDARD_ERROR_TEXT,
                reply_markup=get_support_inline_keyboard()
            )
        except Exception:
            pass
        await callback.answer()

    finally:
        # Vaqtinchalik fayllarni tozalash
        VIDEO_FILE_CACHE.pop(token, None)
        await safe_remove_file(video_temp_path)
        await safe_remove_file(audio_temp_path)


@user_router.callback_query(F.data.startswith("cancel_vfile:"))
async def cb_cancel_video_file(callback: CallbackQuery):
    """❌ 'Yo‘q' tugmasi bosilganda"""
    token = callback.data.split("cancel_vfile:")[1]
    VIDEO_FILE_CACHE.pop(token, None)
    try:
        await callback.message.edit_text("Amal bekor qilindi.")
    except Exception:
        pass
    await callback.answer("Bekor qilindi")
