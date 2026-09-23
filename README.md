# 🤖 Instagram Video & Audio Downloader Telegram Bot (Production-Ready 24/7)

Instagram Reels, Post va Video havolalarini yuklab beruvchi, ulardan sifatli audio (MP3) ajratib oluvchi, video fayllarni qabul qilib audio ajratuvchi, SQLite ma'lumotlar bazasi, admin paneli va to'liq 24/7 uzluksiz ishlash imkoniyatiga ega professional Telegram bot.

---

## 📁 Loyiha Strukturasi

```text
music bot/
├── .env.example              # Muhit o'zgaruvchilari shabloni
├── .gitignore                # Maxfiy va vaqtinchalik fayllarni yashirish
├── requirements.txt          # Kerakli Python kutubxonalari
├── Dockerfile                # Docker konteyneri uchun konfiguratsiya
├── docker-compose.yml        # Docker Compose sozlamalari
├── music_bot.service         # Linux systemd servisi (24/7 foniy rejim)
├── config.py                 # Asosiy sozlamalar va papkalar boshqaruvi
├── main.py                   # Botni ishga tushirish va 24/7 qayta ulanish sikli
├── database/
│   ├── __init__.py
│   └── db.py                 # Asinxron SQLite bazasi va statistika
├── middlewares/
│   ├── __init__.py
│   └── throttling.py         # Anti-flood / Rate limiting (himoya)
├── services/
│   ├── __init__.py
│   ├── ffmpeg_helper.py      # FFmpeg audio ajratish servisi
│   └── downloader.py         # yt-dlp video/audio yuklash servisi
├── utils/
│   ├── __init__.py
│   ├── keyboards.py          # Inline tugmalar va klaviaturalar
│   └── cleaner.py            # Vaqtinchalik fayllarni avtomatik tozalovchi
├── downloads/                # Vaqtinchalik video fayllar (avtomatik tozalanadi)
├── temp/                     # Vaqtinchalik audio fayllar (avtomatik tozalanadi)
└── logs/
    └── bot.log               # Production log fayllari
```

---

## 🔑 1. BOT_TOKEN va ADMIN_ID ni Qayerga Yozish Kerak?

Loyiha papkasida `.env.example` degan fayl bor. Ushbu fayl nusxasini olib, nomini `.env` deb o'zgartiring:
```bash
cp .env.example .env
```
(Yoki Windowsda nusxa ko'chirib, fayl nomini `.env` qiling).

`.env` faylini oching va ichiga o'z ma'lumotlaringizni yozing:

```env
# Telegram @BotFather'dan olingan token:
BOT_TOKEN=8758208022:AAFPuK176EtJuJSYPA4oefsCvTolLHkzxtU

# O'zingizning Telegram profilingiz raqamli ID'si:
ADMIN_ID=123456789

# Admin telegram username'i:
SUPPORT_USERNAME=@Lukhmonjonov_10
```

> [!IMPORTANT]
> **Hech qachon** `BOT_TOKEN`ni Python kodlari ichiga yozmang! Faqat `.env` fayliga yoziladi. `.env` fayli esa `.gitignore` ga kiritilgan bo'lib, GitHubga yoki begona ko'zlarga chiqib ketmaydi.

---

## 🛠 2. BOT_TOKEN va ADMIN_ID ni Qanday Olish Mumkin?

### BOT_TOKEN olish:
1. Telegramda [@BotFather](https://t.me/BotFather) botini oching.
2. `/newbot` buyrug'ini yuboring.
3. Botingizga nom va `@` bilan tugaydigan username tanlang (masalan: `MyInstaSaverBot`).
4. BotFather sizga token beradi (masalan: `1234567890:AAH...`).
5. Ushbu tokenni `.env` faylidagi `BOT_TOKEN=` qatoriga yozing.

### ADMIN_ID olish:
1. Telegramda [@userinfobot](https://t.me/userinfobot) yoki [@getmyid_bot](https://t.me/getmyid_bot) botiga kiring va `/start` bosing.
2. Bot sizning profilingizning raqamli ID sini ko'rsatadi (masalan: `987654321`).
3. Ushbu raqamni `.env` faylidagi `ADMIN_ID=` qatoriga yozing.

---

## 💻 3. Botni Lokal Kompyuterda Ishga Tushirish

### 1-qadam: Kutubxonalarni o'rnatish
Kompyuteringiz terminalida (PowerShell yoki CMD) loyiha papkasiga kiring:
```bash
pip install -r requirements.txt
```

### 2-qadam: Botni ishga tushirish
```bash
python main.py
```
Bot muvaffaqiyatli ishga tushganda konsolda:
`Bot 24/7 rejimida muvaffaqiyatli ishga tushdi: @YourBotUsername` yozuvi paydo bo'ladi.

---

## 🚀 4. Botni 24/7 Serverga Deploy Qilish (Linux / VPS)

### Variant A: Docker & Docker Compose orqali (Eng tavsiya etiladigan usul)
Serveringizda Docker va Docker Compose o'rnatilgan bo'lsa:

1. Fayllarni serverga yuklang:
```bash
cd /opt/music_bot
cp .env.example .env
nano .env  # Token va Admin ID ni yozing
```

2. Konteynerni orqa fonda (background/daemon) ishga tushiring:
```bash
docker compose up -d --build
```

3. Bot holatini ko'rish:
```bash
docker compose ps
```

4. Loglarni jonli kuzatish:
```bash
docker compose logs -f
```

5. Botni qayta ishga tushirish (restart):
```bash
docker compose restart
```

6. To'xtatish:
```bash
docker compose down
```

---

### Variant B: Linux Systemd Servisi Orqali (Docker'siz)

1. Serverga FFmpeg va Python virtual muhitini o'rnating:
```bash
sudo apt update
sudo apt install -y python3-venv python3-pip ffmpeg
```

2. Loyiha papkasida virtual muhit yarating:
```bash
cd /root/music_bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
nano .env
```

3. Systemd servis faylini tizimga ko'chiring:
```bash
sudo cp music_bot.service /etc/systemd/system/
sudo systemctl daemon-reload
```

4. Servisni avtomatik yoqilishini sozlang va ishga tushiring:
```bash
sudo systemctl enable music_bot
sudo systemctl start music_bot
```

5. Servis holatini tekshirish:
```bash
sudo systemctl status music_bot
```

---

## 📋 5. Bot Ishlamay Qolsa Loglarni Qayerdan Ko'rish Kerak?

1. **Lokal yoki Serverdagi log fayli:**
   `logs/bot.log` faylida barcha xabarlar, foydalanuvchilar harakatlari va xatoliklar to'liq qayd etiladi:
   ```bash
   tail -n 100 -f logs/bot.log
   ```

2. **Docker loglari:**
   ```bash
   docker compose logs -f --tail=100
   ```

3. **Systemd loglari:**
   ```bash
   journalctl -u music_bot -f -n 100
   ```

---

## 🔄 6. Botni Qanday Restart Qilish Kerak?

- **Docker orqali:**
  ```bash
  docker compose restart
  ```
- **Systemd orqali:**
  ```bash
  sudo systemctl restart music_bot
  ```
- **Lokal terminalda:**
  Terminalda `Ctrl + C` bosing va qaytadan `python main.py` buyrug'ini bering.

---

## 📊 7. Admin Panel

Botingizga o'zingizning admin Telegram hisobingizdan:
```text
/admin
```
buyrug'ini yuboring. Sizga quyidagi jonli statistika ko'rsatiladi:
- 👥 Jami foydalanuvchilar soni
- ⚡ 24 soat ichida faol bo'lganlar
- 📥 Qayta ishlangan videolar soni
- 🎵 Ajratilgan audiolar soni
- ❌ Yuz bergan xatoliklar soni
- 🟢 Bot holati (Uptime, Server vaqti)
- 🔄 Qayta yangilash tugmasi
