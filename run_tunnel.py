#!/usr/bin/env python3
"""
UzTech PC Market - Do'stlarga havola beruvchi Tunnel Script
"""

import subprocess
import time
import re
import os
import sys

# Windows UTF-8 stdout
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

LINK_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "PUBLIC_LINK.txt")

def start_tunnel():
    print("=" * 60)
    print("UZTECH PC MARKET - JONLI INTERNET HAVOLASI YARATILMOQDA...")
    print("=" * 60)
    
    cmd = [
        'ssh',
        '-o', 'StrictHostKeyChecking=no',
        '-o', 'ServerAliveInterval=30',
        '-o', 'ServerAliveCountMax=5',
        '-T',
        '-R', '80:localhost:8000',
        'nokey@localhost.run'
    ]

    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1, encoding='utf-8', errors='replace')
    
    public_url = None
    
    while True:
        line = p.stdout.readline()
        if not line:
            break
        line_clean = line.strip()
        match = re.search(r'(https://[a-zA-Z0-9\.\-]+\.lhr\.life)', line_clean)
        if match and not public_url:
            public_url = match.group(1)
            full_url = f"{public_url}/index.html"
            print("\n" + "=" * 60)
            print("TAYYOR! DO'STLARINGIZGA YUBORISH UCHUN SILKA (HAVOLA):")
            print(f"--> {full_url}")
            print("=" * 60 + "\n")
            
            with open(LINK_FILE, "w", encoding="utf-8") as f:
                f.write(full_url)
        
        if "tunneled with tls" in line_clean:
            print(f"[Tunnel]: {line_clean}")

    p.wait()

if __name__ == '__main__':
    start_tunnel()
