import time
import logging
from typing import Callable, Dict, Any, Awaitable
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject, Message, CallbackQuery

from config import RATE_LIMIT_SECONDS
from database import db

logger = logging.getLogger(__name__)

class ThrottlingMiddleware(BaseMiddleware):
    def __init__(self, limit: float = RATE_LIMIT_SECONDS):
        self.limit = limit
        self.user_timestamps: Dict[int, float] = {}

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any]
    ) -> Any:
        user = None
        if isinstance(event, Message):
            user = event.from_user
        elif isinstance(event, CallbackQuery):
            user = event.from_user

        if user:
            user_id = user.id
            current_time = time.time()
            last_time = self.user_timestamps.get(user_id, 0.0)

            # Foydalanuvchini bazaga kiritish / faolligini yangilash
            try:
                await db.add_or_update_user(
                    user_id=user_id,
                    username=user.username,
                    first_name=user.first_name
                )
            except Exception as e:
                logger.error(f"Foydalanuvchi ma'lumotini yangilashda xato: {e}")

            # Rate limit tekshiruvi (faqat matn va media xabarlar uchun)
            if isinstance(event, Message) and (event.text or event.video):
                # /start yoki /help buyruqlariga qat'iy cheklov qo'ymaymiz
                if event.text and event.text.startswith("/"):
                    return await handler(event, data)

                if current_time - last_time < self.limit:
                    logger.warning(f"Foydalanuvchi {user_id} tez-tez so'rov yubordi (Flood protection).")
                    await event.reply("⏳ Iltimos, biroz kuting. So'rovlar oralig'i kamida 2 soniya bo'lishi lozim.")
                    return

                self.user_timestamps[user_id] = current_time

        return await handler(event, data)
