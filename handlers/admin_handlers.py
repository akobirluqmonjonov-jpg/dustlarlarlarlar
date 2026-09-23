import time
import logging
from datetime import datetime
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command

from config import is_admin
from database import db
from utils.keyboards import get_admin_keyboard

logger = logging.getLogger(__name__)
admin_router = Router()

BOT_START_TIME = time.time()

def get_uptime_str() -> str:
    """Bot qancha vaqtdan beri uzluksiz ishlayotganini hisoblash"""
    uptime_seconds = int(time.time() - BOT_START_TIME)
    days, remainder = divmod(uptime_seconds, 86400)
    hours, remainder = divmod(remainder, 3600)
    minutes, seconds = divmod(remainder, 60)
    if days > 0:
        return f"{days} kun, {hours} soat, {minutes} daqiqa"
    elif hours > 0:
        return f"{hours} soat, {minutes} daqiqa, {seconds} soniya"
    else:
        return f"{minutes} daqiqa, {seconds} soniya"


async def generate_stats_message() -> str:
    """Admin panel uchun statistika matnini tayyorlash"""
    stats = await db.get_system_stats()
    uptime = get_uptime_str()
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    text = (
        "📊 <b>ADMIN PANEL | BOT STATISTIKASI</b>\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        f"👥 <b>Jami foydalanuvchilar:</b> {stats['total_users']}\n"
        f"⚡ <b>24 soat ichida faol:</b> {stats['active_users_24h']}\n"
        f"📥 <b>Qayta ishlangan videolar:</b> {stats['total_videos']}\n"
        f"🎵 <b>Ajratilgan audiolar:</b> {stats['total_audios']}\n"
        f"❌ <b>Qayd etilgan xatoliklar:</b> {stats['total_errors']}\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n"
        f"🟢 <b>Bot holati:</b> Ishlamoqda (24/7)\n"
        f"⏱ <b>Uptime:</b> {uptime}\n"
        f"🕒 <b>Server vaqti:</b> {now_str}\n"
    )
    return text


@admin_router.message(Command("admin"))
async def cmd_admin(message: Message):
    """Admin panel buyrug'i (Raqamli ID yoki Username orqali tekshiriladi)"""
    user_id = message.from_user.id
    username = message.from_user.username or ""

    if not is_admin(user_id, username):
        return  # Begona foydalanuvchilarga bildirmasdan o'tkazib yuborish

    text = await generate_stats_message()
    await message.answer(text, parse_mode="HTML", reply_markup=get_admin_keyboard())


@admin_router.callback_query(F.data.in_(["admin_refresh", "admin_stats_refresh"]))
async def cb_admin_refresh(callback: CallbackQuery):
    """Admin statistikani yangilash callback'i"""
    user_id = callback.from_user.id
    username = callback.from_user.username or ""

    if not is_admin(user_id, username):
        await callback.answer("Ruxsat berilmagan!", show_alert=True)
        return

    text = await generate_stats_message()
    try:
        await callback.message.edit_text(text, parse_mode="HTML", reply_markup=get_admin_keyboard())
        await callback.answer("Statistika yangilandi 🔄")
    except Exception:
        await callback.answer("Ma'lumotlar allaqachon eng so'nggi holatda.")
