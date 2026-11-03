import argparse
import json
from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
CLIENTS_FILE = ROOT / "src" / "config" / "clients.json"
LOGOS_DIR = ROOT / "public" / "logos"
OUTPUT_DIR = Path(__file__).resolve().parent / "output"


def hex_to_rgb(hex_color: str):
    h = hex_color.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def make_qr(url: str, logo_path: Path | None, color: str, size: int = 1000):
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,  # logo ke liye zaroori
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(
        fill_color=hex_to_rgb(color), back_color="white"
    ).convert("RGB")
    img = img.resize((size, size), Image.NEAREST)

    # Logo center mein, QR ke 20% se bada nahi
    if logo_path and logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo_size = int(size * 0.20)
        logo.thumbnail((logo_size, logo_size), Image.LANCZOS)

        pad = 14
        bg_w, bg_h = logo.width + pad * 2, logo.height + pad * 2
        badge = Image.new("RGBA", (bg_w, bg_h), (0, 0, 0, 0))
        ImageDraw.Draw(badge).rounded_rectangle(
            (0, 0, bg_w, bg_h), radius=18, fill=(255, 255, 255, 255)
        )
        badge.paste(logo, (pad, pad), logo)

        pos = ((size - bg_w) // 2, (size - bg_h) // 2)
        img.paste(badge, pos, badge)
    elif logo_path:
        print(f"  ! Logo nahi mila: {logo_path} (bina logo ke QR ban raha hai)")

    return img


def main():
    parser = argparse.ArgumentParser(description="Client QR code generator")
    parser.add_argument("--domain", required=True,
                        help="Live site, jaise https://review-booster.vercel.app")
    parser.add_argument("--slug", help="Sirf ek client (clients.json ka key)")
    args = parser.parse_args()

    domain = args.domain.rstrip("/")
    clients = json.loads(CLIENTS_FILE.read_text(encoding="utf-8"))
    OUTPUT_DIR.mkdir(exist_ok=True)

    slugs = [args.slug] if args.slug else list(clients.keys())

    for slug in slugs:
        if slug not in clients:
            print(f"x '{slug}' clients.json mein nahi hai")
            continue

        c = clients[slug]
        url = f"{domain}/c/{slug}"
        logo = ROOT / "public" / c["logo"].lstrip("/")

        img = make_qr(url, logo, c.get("brandColor", "#000000"))
        out = OUTPUT_DIR / f"{slug}.png"
        img.save(out, dpi=(300, 300))
        print(f"OK {slug} -> {out}\n   URL: {url}")


if __name__ == "__main__":
    main()