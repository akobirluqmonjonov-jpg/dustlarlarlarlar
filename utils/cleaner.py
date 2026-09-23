import os
import time
import asyncio
import logging
from pathlib import Path
from config import DOWNLOADS_DIR, TEMP_DIR

logger = logging.getLogger(__name__)

async def safe_remove_file(file_path: str, max_retries: int = 3, delay: float = 0.5):
    """
    Faylni xavfsiz o'chirish (ayniqsa Windowsda fayl deskriptori darhol bo'shatilmasligi holatlarida).
    """
    if not file_path or not os.path.exists(file_path):
        return

    for attempt in range(max_retries):
        try:
            os.remove(file_path)
            logger.debug(f"Fayl muvaffaqiyatli o'chirildi: {file_path}")
            return
        except PermissionError:
            await asyncio.sleep(delay)
        except Exception as e:
            logger.warning(f"Faylni o'chirishda xatolik ({file_path}): {e}")
            break


async def clean_directory_old_files(directory: Path, max_age_seconds: int = 1800):
    """
    Papkadagi berilgan muddatdan (masalan 30 daqiqa) eski bo'lgan fayllarni tozalash.
    """
    if not directory.exists():
        return

    current_time = time.time()
    for item in directory.iterdir():
        if item.is_file():
            try:
                file_age = current_time - item.stat().st_mtime
                if file_age > max_age_seconds:
                    item.unlink(missing_ok=True)
                    logger.info(f"Eski vaqtinchalik fayl tozalandi: {item.name}")
            except Exception as e:
                logger.debug(f"Faylni tozalashda xatolik ({item.name}): {e}")


async def start_periodic_cleanup(interval_seconds: int = 1800, max_age_seconds: int = 1800):
    """
    Orqa fonda doimiy ishlovchi tozalash vazifasi (24/7 ishlash uchun xotira to'lib ketmasligini ta'minlaydi).
    """
    logger.info("Avtomatik fayl tozalash xizmati ishga tushirildi.")
    while True:
        try:
            await asyncio.sleep(interval_seconds)
            await clean_directory_old_files(DOWNLOADS_DIR, max_age_seconds)
            await clean_directory_old_files(TEMP_DIR, max_age_seconds)
        except asyncio.CancelledError:
            logger.info("Fayl tozalash xizmati to'xtatildi.")
            break
        except Exception as e:
            logger.error(f"Fayl tozalash jarayonida kutilmagan xatolik: {e}")
