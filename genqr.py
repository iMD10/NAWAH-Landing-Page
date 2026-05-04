import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
def generate_qr():
    # The URL for Nawah
    url = "https://nawahfamily.com"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H, # High error correction to allow logo/styling
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    # Creating the styled image with transparency
    # We'll use Rounded modules and a solid black color
    # Set back_color to a 4-tuple (R, G, B, A) for transparency
    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=SolidFillColorMask(
            back_color=(255, 255, 255, 0),    # Transparent background
            front_color=(0, 0, 0, 255)        # Black (Full opacity)
        )
    ).convert("RGBA") # Ensure it's RGBA for the alpha channel to work correctly

    # Save to the project directory
    img.save("C:\\dev\\nawah-exp\\public\\qr.png")
    print("Transparent QR Code generated successfully!")
if __name__ == "__main__":
    generate_qr()