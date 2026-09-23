import os
import shutil
import logging
import asyncio
import subprocess
from typing import Optional

logger = logging.getLogger(__name__)

def get_ffmpeg_exe() -> Optional[str]:
    """
    Tizimda yoki imageio-ffmpeg kutubxonasida ffmpeg borligini aniqlash.
    """
    # 1. Tizimdagi 'ffmpeg' buyrug'ini tekshirish
    system_ffmpeg = shutil.which("ffmpeg")
    if system_ffmpeg and os.path.exists(system_ffmpeg):
        return system_ffmpeg

    # 2. imageio_ffmpeg kutubxonasidan qidirish
    try:
        import imageio_ffmpeg
        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if exe and os.path.exists(exe):
            return exe
    except Exception as e:
        logger.debug(f"imageio_ffmpeg orqali ffmpeg topilmadi: {e}")

    return None


def _sync_extract_audio(video_path: str, output_mp3_path: str) -> bool:
    """
    Sinxron ravishda videodan MP3 audio ajratish.
    """
    ffmpeg_exe = get_ffmpeg_exe()
    if not ffmpeg_exe:
        logger.error("FFmpeg topilmadi. Audio ajratib bo'lmaydi.")
        return False

    cmd = [
        ffmpeg_exe,
        "-y",               # Mavjud faylni qayta yozish
        "-i", video_path,   # Kirish video fayli
        "-vn",              # Video oqimini olib tashlash
        "-acodec", "libmp3lame",
        "-b:a", "192k",     # Sifatli audio (192 kbps)
        output_mp3_path
    ]

    try:
        process = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=120,
            check=True
        )
        return os.path.exists(output_mp3_path) and os.path.getsize(output_mp3_path) > 0
    except subprocess.TimeoutExpired:
        logger.error(f"FFmpeg audio ajratishda timeout yuz berdi: {video_path}")
        return False
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg xatosi: {e.stderr.decode('utf-8', errors='ignore')}")
        return False
    except Exception as e:
        logger.error(f"Kutilmagan audio ajratish xatosi: {e}", exc_info=True)
        return False


async def extract_audio_from_video_file(video_path: str, output_mp3_path: str) -> bool:
    """
    Asinxron ravishda video faylidan MP3 ajratib olish (event loop bloklanmaydi).
    """
    return await asyncio.to_thread(_sync_extract_audio, video_path, output_mp3_path)
