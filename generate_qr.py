import qrcode

for i in range(1, 11):  # 10 bàn
    url = f"https://yourdomain.com/index.html?table={i}"
    img = qrcode.make(url)
    img.save(f"qr_ban_{i}.png")
