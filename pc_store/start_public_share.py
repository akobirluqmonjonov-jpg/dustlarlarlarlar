import subprocess
import time
import re
import os
import sys

cmd = ['ssh', '-o', 'StrictHostKeyChecking=no', '-T', '-R', '80:localhost:8000', 'nokey@localhost.run']

p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

url = None
for _ in range(40):
    line = p.stdout.readline()
    if not line:
        break
    match = re.search(r'(https://[a-zA-Z0-9\.\-]+\.lhr\.life)', line)
    if match:
        url = match.group(1)
        break
    time.sleep(0.1)

if url:
    full_url = f"{url}/index.html"
    with open("LIVE_LINK.txt", "w") as f:
        f.write(full_url)
    print("PUBLIC_URL_READY:" + full_url, flush=True)

# Keep process alive
while True:
    time.sleep(30)
