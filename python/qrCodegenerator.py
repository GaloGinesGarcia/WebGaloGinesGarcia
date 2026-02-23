import qrcode


url = "https://galoginesgarcia.github.io/WebGaloGinesGarcia/"

qr = qrcode.QRCode(
    version = 1,
    box_size = 10,
    border = 5
)

qr.add_data(url)
qr.make(fit = True)

img = qr.make_image(fill_color = "black", back_color = "white")

img.save("codigoQrGalo.png")
print("codigo generado y guardado con exito.")