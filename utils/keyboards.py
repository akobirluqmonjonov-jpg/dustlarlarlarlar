from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from config import SUPPORT_URL, SUPPORT_USERNAME

def get_start_keyboard(bot_username: str = "dustlar_lar_lar_lar_bot") -> InlineKeyboardMarkup:
    """/start komandasi uchun inline tugmalar (Do'stlarga ulashish bilan)"""
    share_url = f"https://t.me/share/url?url=https://t.me/{bot_username}&text=Instagramdan%20video%20va%20musiqalarni%20oson%20yuklab%20oluvchi%20bot!"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="📖 Qo‘llanma", callback_data="show_guide"),
                InlineKeyboardButton(text="👤 Admin bilan bog‘lanish", url=SUPPORT_URL)
            ],
            [
                InlineKeyboardButton(text="🚀 Do‘stlarga ulashish", url=share_url)
            ]
        ]
    )

def get_video_audio_offer_keyboard(token: str, bot_username: str = "dustlar_lar_lar_lar_bot") -> InlineKeyboardMarkup:
    """Video yuborilgandan so'ng audio kerakligini so'rash tugmalari"""
    share_url = f"https://t.me/share/url?url=https://t.me/{bot_username}&text=Instagramdan%20video%20va%20musiqalarni%20oson%20yuklab%20oluvchi%20bot!"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🎵 Musiqani olish", callback_data=f"get_audio:{token}"),
                InlineKeyboardButton(text="❌ Kerak emas", callback_data=f"cancel_audio:{token}")
            ],
            [
                InlineKeyboardButton(text="🚀 Do‘stlarga ulashish", url=share_url)
            ]
        ]
    )

def get_audio_ready_keyboard(token: str) -> InlineKeyboardMarkup:
    """Audio tayyor bo'lganda 'Yuklash' tugmasi"""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="📥 Yuklash", callback_data=f"send_audio:{token}")
            ]
        ]
    )

def get_file_audio_offer_keyboard(token: str) -> InlineKeyboardMarkup:
    """Video fayl yuborilganda audio ajratish taklifi tugmalari"""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🎵 Ha, audio olish", callback_data=f"extract_vfile:{token}"),
                InlineKeyboardButton(text="❌ Yo‘q", callback_data=f"cancel_vfile:{token}")
            ]
        ]
    )

def get_support_inline_keyboard() -> InlineKeyboardMarkup:
    """Xatolik yuz berganda adminga murojaat qilish tugmasi"""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="👨‍💻 Admin bilan bog‘lanish", url=SUPPORT_URL)
            ]
        ]
    )

def get_admin_keyboard() -> InlineKeyboardMarkup:
    """Admin panel uchun boshqaruv tugmalari"""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🔄 Yangilash", callback_data="admin_refresh"),
                InlineKeyboardButton(text="📊 Batafsil statistika", callback_data="admin_stats_refresh")
            ]
        ]
    )
