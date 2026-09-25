#!/usr/bin/env python3
"""
UzTech PC Market - Mahalliy Server Runner
Bu skript avtomatik tarzda bo'sh portni topadi (8000 dan boshlab),
veb-serverni ishga tushiradi va brauzerda ochadi.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Cache muammolarini oldini olish uchun
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    global PORT
    while PORT < 8050:
        try:
            with socketserver.TCPServer(("", PORT), Handler) as httpd:
                url = f"http://localhost:{PORT}/index.html"
                print("=" * 60)
                print("   UZTECH PC MARKET - KOMPYUTER DO'KONI ISHGA TUSHDI")
                print("=" * 60)
                print(f" * Server manzili: {url}")
                print(f" * Papka: {DIRECTORY}")
                print(" * Chiqish uchun: Ctrl + C bosing")
                print("=" * 60)
                
                # Brauzerda avtomatik ochish
                try:
                    webbrowser.open(url)
                except Exception as e:
                    print(f"Brauzerni ochishda ogohlantirish: {e}")

                httpd.serve_forever()
                break
        except OSError:
            PORT += 1

if __name__ == '__main__':
    run_server()
