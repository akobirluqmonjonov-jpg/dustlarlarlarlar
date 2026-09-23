import os
from pathlib import Path
from dotenv import load_dotenv

# Loyihaning asosiy papkasi
BASE_DIR = Path(__file__).resolve().parent

# .env faylini yuklash
load_dotenv(BASE_DIR / ".env")

# Asosiy sozlamalar (Muhit o'zgaruvchilaridan olinadi)
BOT_TOKEN = os.getenv("BOT_TOKEN", "").strip()

# Admin identifikatorini o'qish (Raqamli ID yoki Username bo'lishi mumkin)
ADMIN_IDENTIFIER = os.getenv("ADMIN_ID", "").strip()
ADMIN_ID = int(ADMIN_IDENTIFIER) if ADMIN_IDENTIFIER.isdigit() else 0
ADMIN_USERNAME = ADMIN_IDENTIFIER.lstrip("@").lower() if not ADMIN_IDENTIFIER.isdigit() else ""

def is_admin(user_id: int, username: str = "") -> bool:
    """Foydalanuvchi admin ekanligini raqamli ID yoki Username orqali tekshirish"""
    if ADMIN_ID and user_id == ADMIN_ID:
        return True
    if ADMIN_USERNAME and username and username.lower().lstrip("@") == ADMIN_USERNAME:
        return True
    return False

SUPPORT_USERNAME = os.getenv("SUPPORT_USERNAME", "@Lukhmonjonov_10").strip()
if not SUPPORT_USERNAME.startswith("@"):
    SUPPORT_USERNAME = f"@{SUPPORT_USERNAME}"

SUPPORT_URL = f"https://t.me/{SUPPORT_USERNAME.lstrip('@')}"

# Papkalar konfiguratsiyasi
DOWNLOADS_DIR = BASE_DIR / "downloads"
TEMP_DIR = BASE_DIR / "temp"
LOGS_DIR = BASE_DIR / "logs"
DATABASE_PATH = BASE_DIR / "database" / "bot_database.db"

# Papkalarni yaratish
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)
LOGS_DIR.mkdir(parents=True, exist_ok=True)
DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)

# Limitlar va cheklovlar
MAX_FILE_SIZE_MB = 50  # Telegram bot API chegarasi (50 MB)
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
RATE_LIMIT_SECONDS = 2.0  # Bir foydalanuvchi so'rovlari orasidagi minimal vaqt
DOWNLOAD_TIMEOUT_SECONDS = 180  # Yuklab olish uchun maksimal kutish vaqti
