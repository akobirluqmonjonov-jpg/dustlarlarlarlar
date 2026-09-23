import os
import sys

# Windows konsolida UTF-8 emojilar bilan xatosiz ishlash
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import asyncio
import logging
from logging.handlers import RotatingFileHandler

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.client.session.aiohttp import AiohttpSession

from config import BOT_TOKEN, ADMIN_ID, LOGS_DIR
from database import db
from middlewares import ThrottlingMiddleware
from handlers import user_router, admin_router
from utils.cleaner import start_periodic_cleanup

# =========================================================================
# PRODUCTION LOGGING TIZIMI
# =========================================================================
log_file_path = LOGS_DIR / "bot.log"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        RotatingFileHandler(
            log_file_path,
            maxBytes=10 * 1024 * 1024,  # 10 MB gacha bitta fayl
            backupCount=5,               # 5 tagacha zaxira log fayl
            encoding="utf-8"
        )
    ]
)
logger = logging.getLogger("music_bot")


async def on_startup(bot: Bot):
    """
    Bot ishga tushganda bajariladigan dastlabki amallar
    """
    # Ma'lumotlar bazasini tayyorlash
    await db.init_db()

    # Avtomatik fayl tozalash xizmatini foniy rejimda ishga tushirish
    asyncio.create_task(start_periodic_cleanup(interval_seconds=1800, max_age_seconds=1800))

    bot_info = await bot.get_me()
    logger.info(f"Bot 24/7 rejimida muvaffaqiyatli ishga tushdi: @{bot_info.username} (ID: {bot_info.id})")

    # Adminga xabar jo'natish (agar ADMIN_ID kiritilgan bo'lsa)
    if ADMIN_ID and ADMIN_ID > 0:
        try:
            await bot.send_message(
                chat_id=ADMIN_ID,
                text=(
                    f"🚀 <b>Bot muvaffaqiyatli ishga tushirildi!</b>\n\n"
                    f"🤖 Bot: @{bot_info.username}\n"
                    f"🟢 Holati: <b>24/7 Faol</b>\n\n"
                    f"Admin panelni ochish uchun: /admin"
                ),
                parse_mode="HTML"
            )
        except Exception as e:
            logger.warning(f"Adminga start xabarini yuborishda xatolik: {e}")


async def main():
    """
    Botning asosiy boshqaruv nuqtasi
    """
    # Token mavjudligini tekshirish
    if not BOT_TOKEN or "BU_YERGA" in BOT_TOKEN:
        logger.critical(
            "\n" + "=" * 60 + "\n"
            "❌ XATOLIK: BOT_TOKEN topilmadi yoki to'ldirilmadi!\n"
            "Iltimos, loyiha papkasidagi '.env' faylini ochib, o'z bot tokeningizni kiriting:\n"
            "BOT_TOKEN=1234567890:AAExampleToken...\n"
            "=" * 60
        )
        sys.exit(1)

    # 300 soniyalik timeout bilan barqaror aiohttp sessiya
    session = AiohttpSession(timeout=300)
    bot = Bot(
        token=BOT_TOKEN,
        session=session,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )

    dp = Dispatcher()

    # Middlewarelarni ro'yxatdan o'tkazish
    dp.message.middleware(ThrottlingMiddleware())
    dp.callback_query.middleware(ThrottlingMiddleware())

    # Routerlarni ulash
    dp.include_router(admin_router)
    dp.include_router(user_router)

    # Startup tadbiri
    dp.startup.register(on_startup)

    # 24/7 rejimida uzluksiz ishlash uchun qayta ulanish mexanizmi
    logger.info("Bot polling tsikli boshlanmoqda...")
    while True:
        try:
            # Eski to'planib qolgan xabarlarni tozalash (drop_pending_updates=True)
            await bot.delete_webhook(drop_pending_updates=True)
            await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
        except (KeyboardInterrupt, SystemExit):
            logger.info("Bot foydalanuvchi tomonidan to'xtatildi.")
            break
        except Exception as e:
            logger.critical(
                f"Kutilmagan tarmoq yoki tizim xatosi: {e}. 5 soniyadan so'ng qayta ulanadi...",
                exc_info=True
            )
            await asyncio.sleep(5)

    await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Dastur to'xtatildi.")
