import os
import re
import uuid
import logging
import asyncio
from typing import Optional, Tuple
import yt_dlp

from config import DOWNLOADS_DIR, MAX_FILE_SIZE_BYTES
from services.ffmpeg_helper import get_ffmpeg_exe

logger = logging.getLogger(__name__)

# Instagram havolasi uchun tozalovchi regex
INSTAGRAM_CLEAN_REGEX = re.compile(r"(https?://(?:www\.)?instagram\.com/(?:reel|reels|p|tv)/[A-Za-z0-9_-]+)")

def clean_url(url: str) -> Optional[str]:
    """
    Instagram havolasidagi ortiqcha tracking parametrlarini tozalab, sof havolani qaytarish.
    """
    match = INSTAGRAM_CLEAN_REGEX.search(url)
    if match:
        clean = match.group(1).rstrip("/")
        # reels ni reel ga moslashtirish (yt-dlp uchun qulay)
        clean = clean.replace("/reels/", "/reel/")
        return f"{clean}/"
    return None


def _sync_download_video(url: str) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    """
    Sinxron yt-dlp orqali Instagram videosini yuklab olish.
    Qaytaradi: (file_path, title, error_message)
    """
    unique_id = uuid.uuid4().hex[:10]
    out_template = os.path.join(DOWNLOADS_DIR, f"video_{unique_id}.%(ext)s")
    ffmpeg_exe = get_ffmpeg_exe()

    ydl_opts = {
        # Tayyor bitta video+audio oqimini olish (eng tez va ishonchli usul)
        'format': 'b/best[ext=mp4]/best',
        'outtmpl': out_template,
        'quiet': True,
        'no_warnings': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.instagram.com/',
        },
        'socket_timeout': 60,
        'retries': 5,
        'fragment_retries': 5,
        'nocheckcertificate': True,
        'geo_bypass': True,
    }

    if ffmpeg_exe:
        ydl_opts['ffmpeg_location'] = ffmpeg_exe

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get('title') or "Instagram Video"
            # Agar sarlavha juda uzun bo'lsa yoki bo'sh bo'lsa
            if len(title) > 60:
                title = title[:57] + "..."

            # Faylni qidirish
            for fname in os.listdir(DOWNLOADS_DIR):
                if fname.startswith(f"video_{unique_id}"):
                    file_path = os.path.join(DOWNLOADS_DIR, fname)
                    file_size = os.path.getsize(file_path)

                    if file_size == 0:
                        os.remove(file_path)
                        return None, None, "Fayl bo'sh bo'lib yuklandi"

                    if file_size > MAX_FILE_SIZE_BYTES:
                        os.remove(file_path)
                        return None, None, f"Video hajmi juda katta ({file_size // (1024*1024)} MB). Telegram bot maksimal 50 MB gacha fayl yubora oladi."

                    return file_path, title, None

            return None, None, "Yuklangan video fayli topilmadi"
    except Exception as e:
        logger.error(f"yt-dlp video yuklashda xatolik: {e}")
        return None, None, str(e)


def _sync_download_audio(url: str) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    """
    Sinxron yt-dlp orqali Instagram audiosini MP3 formatida yuklab olish.
    Qaytaradi: (file_path, title, error_message)
    """
    unique_id = uuid.uuid4().hex[:10]
    out_template = os.path.join(DOWNLOADS_DIR, f"audio_{unique_id}.%(ext)s")
    ffmpeg_exe = get_ffmpeg_exe()

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': out_template,
        'quiet': True,
        'no_warnings': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.instagram.com/',
        },
        'socket_timeout': 60,
        'retries': 5,
        'fragment_retries': 5,
        'nocheckcertificate': True,
        'geo_bypass': True,
    }

    if ffmpeg_exe:
        ydl_opts['ffmpeg_location'] = ffmpeg_exe
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }]

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get('title') or "Instagram Audio"
            if len(title) > 60:
                title = title[:57] + "..."

            for fname in os.listdir(DOWNLOADS_DIR):
                if fname.startswith(f"audio_{unique_id}"):
                    file_path = os.path.join(DOWNLOADS_DIR, fname)
                    file_size = os.path.getsize(file_path)

                    if file_size == 0:
                        os.remove(file_path)
                        return None, None, "Audio fayl bo'sh bo'lib yuklandi"

                    if file_size > MAX_FILE_SIZE_BYTES:
                        os.remove(file_path)
                        return None, None, f"Audio hajmi juda katta ({file_size // (1024*1024)} MB)."

                    return file_path, title, None

            return None, None, "Yuklangan audio fayli topilmadi"
    except Exception as e:
        logger.error(f"yt-dlp audio yuklashda xatolik: {e}")
        return None, None, str(e)


async def download_instagram_video(url: str) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    """Asinxron video yuklab olish"""
    return await asyncio.to_thread(_sync_download_video, url)


async def download_instagram_audio(url: str) -> Tuple[Optional[str], Optional[str], Optional[str]]:
    """Asinxron audio yuklab olish"""
    return await asyncio.to_thread(_sync_download_audio, url)
