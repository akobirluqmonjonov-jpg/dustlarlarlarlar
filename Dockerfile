FROM python:3.12-slim

# Tizim paketlarini yangilash va FFmpeg o'rnatish
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg curl tzdata && \
    rm -rf /var/lib/apt/lists/*

# Ishchi papkani belgilash
WORKDIR /app

# Talablar faylini ko'chirish va paketlarni o'rnatish
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Kerakli papkalarni yaratish
RUN mkdir -p downloads temp logs database

# Loyiha fayllarini ko'chirish
COPY . .

# Botni ishga tushirish
CMD ["python", "main.py"]
