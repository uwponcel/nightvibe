"""One-shot asset pipeline: logo variants + optimized site photos."""

from pathlib import Path

from PIL import Image, ImageOps

SRC = Path(r"C:\Users\uwpon\Desktop\pictures")
PUB = Path(r"C:\git\perso\nightvibe\public")
PHOTOS = PUB / "photos"
PHOTOS.mkdir(parents=True, exist_ok=True)


def process_logo() -> None:
    """logo-fb.png (black mark on white) -> tight-cropped white/transparent."""
    img = Image.open(PUB / "logo-fb.png").convert("L")
    # Content bbox: anything darker than near-white.
    mask = img.point(lambda v: 255 if v < 200 else 0)
    bbox = mask.getbbox()
    pad = int(max(img.size) * 0.04)
    left, top, right, bottom = bbox
    box = (
        max(0, left - pad),
        max(0, top - pad),
        min(img.width, right + pad),
        min(img.height, bottom + pad),
    )
    cropped = img.crop(box)

    # White mark on transparent: alpha = darkness of the original mark.
    alpha = ImageOps.invert(cropped)
    white = Image.new("RGBA", cropped.size, (242, 242, 240, 0))
    white.putalpha(alpha)
    white.save(PUB / "logo-white.png", optimize=True)

    # Square black-on-white for og:image / favicon.
    og = Image.open(PUB / "logo-fb.png").convert("RGB").resize((1200, 1200))
    og.save(PUB / "og.png", optimize=True)
    print("logo:", white.size)


def export(src: Path, dest: str, max_w: int, quality: int = 80) -> None:
    img = Image.open(src)
    img = ImageOps.exif_transpose(img).convert("RGB")
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    out = PHOTOS / dest
    img.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{dest}: {img.size} {out.stat().st_size // 1024} KB")


MUR = [
    ("580a5e9f3ea4ff077cc06b16_10862474_544395199069165_5910529674557509616_o.jpg", "mur-feature.jpg", 1100),
    ("580a5ea0af35fbf87b987540_12304508_518362791672406_8020782911995309913_o.jpg", "mur-1.jpg", 800),
    ("580a5ea0e603d78a4f6a9e60_12186440_507090069466345_7414458054437593143_o.jpg", "mur-2.jpg", 800),
    ("580a5ea40111afb406227532_12998701_570019053173446_5310856356435465612_n.jpg", "mur-3.jpg", 800),
    ("580a5ea53ea4ff077cc06b17_13002471_573586699483348_9203845627940981006_o.jpg", "mur-4.jpg", 800),
    ("580a5eaa6620dac506b9101b_13247741_588763997965618_3707782101246412805_o.jpg", "mur-5.jpg", 800),
    ("580a5ebb980071974fba1dd0_14372022_643740119134672_761889140443749292_o.jpg", "mur-6.jpg", 800),
]


def main() -> None:
    process_logo()

    export(SRC / "shop" / "shop-overview.jpg", "hero.jpg", 1920, 82)
    export(SRC / "shop" / "shop-front.jpg", "story.jpg", 1000)
    export(SRC / "shop" / "shop-upstairs.jpg", "boutique.jpg", 1000)

    export(SRC / "euqipe" / "2sai-2.jpg", "equipe-2sai.jpg", 800)
    for i, name in enumerate(["idk.jpg", "idk-2.jpg", "idk-3.jpg", "idk-4.jpg", "idk-5.jpg"], start=1):
        export(SRC / "euqipe" / name, f"equipe-{i}.jpg", 800)

    for src_name, dest, w in MUR:
        export(SRC / "mur" / src_name, dest, w)


if __name__ == "__main__":
    main()
