import aiosqlite
import logging
from datetime import datetime
from typing import Dict, Any, Optional
from config import DATABASE_PATH

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, db_path: str = str(DATABASE_PATH)):
        self.db_path = db_path

    async def init_db(self):
        """Ma'lumotlar bazasi jadvallarini yaratish va indekslarni sozlash"""
        async with aiosqlite.connect(self.db_path) as db:
            # Users jadvali
            await db.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id INTEGER PRIMARY KEY,
                    username TEXT,
                    first_name TEXT,
                    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    downloaded_videos INTEGER DEFAULT 0,
                    extracted_audios INTEGER DEFAULT 0,
                    error_count INTEGER DEFAULT 0
                )
            """)

            # Harakatlar logi jadvali
            await db.execute("""
                CREATE TABLE IF NOT EXISTS actions_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    action TEXT,
                    status TEXT,
                    error_message TEXT,
                    duration REAL DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Tezkor qidiruv uchun indekslar
            await db.execute("CREATE INDEX IF NOT EXISTS idx_users_last_activity ON users(last_activity)")
            await db.execute("CREATE INDEX IF NOT EXISTS idx_actions_created ON actions_log(created_at)")
            await db.commit()
            logger.info("Ma'lumotlar bazasi muvaffaqiyatli ishga tushirildi.")

    async def add_or_update_user(self, user_id: int, username: Optional[str], first_name: Optional[str]):
        """Foydalanuvchi ma'lumotlarini qo'shish yoki yangilash"""
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT INTO users (user_id, username, first_name, first_seen, last_activity)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                    username = excluded.username,
                    first_name = excluded.first_name,
                    last_activity = excluded.last_activity
            """, (user_id, username or "", first_name or "", now, now))
            await db.commit()

    async def increment_video_count(self, user_id: int):
        """Foydalanuvchining video yuklashlar sonini 1 taga oshirish"""
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                UPDATE users 
                SET downloaded_videos = downloaded_videos + 1,
                    last_activity = ?
                WHERE user_id = ?
            """, (now, user_id))
            await db.commit()

    async def increment_audio_count(self, user_id: int):
        """Foydalanuvchining audio ajratishlar sonini 1 taga oshirish"""
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                UPDATE users 
                SET extracted_audios = extracted_audios + 1,
                    last_activity = ?
                WHERE user_id = ?
            """, (now, user_id))
            await db.commit()

    async def increment_error_count(self, user_id: int):
        """Foydalanuvchi xatoliklar sonini 1 taga oshirish"""
        now = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                UPDATE users 
                SET error_count = error_count + 1,
                    last_activity = ?
                WHERE user_id = ?
            """, (now, user_id))
            await db.commit()

    async def log_action(self, user_id: int, action: str, status: str, error_message: str = "", duration: float = 0.0):
        """Harakatlar jurnaliga yozish"""
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT INTO actions_log (user_id, action, status, error_message, duration)
                VALUES (?, ?, ?, ?, ?)
            """, (user_id, action, status, error_message, round(duration, 2)))
            await db.commit()

    async def get_system_stats(self) -> Dict[str, Any]:
        """Admin panel uchun to'liq tizim statistikasini olish"""
        async with aiosqlite.connect(self.db_path) as db:
            # Jami foydalanuvchilar soni
            async with db.execute("SELECT COUNT(*) FROM users") as cursor:
                total_users = (await cursor.fetchone())[0] or 0

            # Jami yuklangan videolar soni
            async with db.execute("SELECT SUM(downloaded_videos) FROM users") as cursor:
                total_videos = (await cursor.fetchone())[0] or 0

            # Jami ajratilgan audiolar soni
            async with db.execute("SELECT SUM(extracted_audios) FROM users") as cursor:
                total_audios = (await cursor.fetchone())[0] or 0

            # Jami xatoliklar soni
            async with db.execute("SELECT SUM(error_count) FROM users") as cursor:
                total_errors = (await cursor.fetchone())[0] or 0

            # Oxirgi 24 soat ichida faol bo'lgan foydalanuvchilar
            async with db.execute("""
                SELECT COUNT(*) FROM users 
                WHERE datetime(last_activity) >= datetime('now', '-1 day')
            """) as cursor:
                active_users_24h = (await cursor.fetchone())[0] or 0

            return {
                "total_users": total_users,
                "total_videos": total_videos,
                "total_audios": total_audios,
                "total_errors": total_errors,
                "active_users_24h": active_users_24h
            }

db = Database()
