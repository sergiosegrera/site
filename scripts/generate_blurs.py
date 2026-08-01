"""Generate blur placeholders for the travel photos.

These are inlined into the page as base64 data URLs, so every byte here is a byte
in the HTML document for every visitor. 16px wide is enough: the browser scales it
up behind the real image, and the downsampling is the blur.
"""

import io
import sys
from pathlib import Path

from PIL import Image

BLUR_WIDTH = 16
BLUR_QUALITY = 65


def generate_blurs(root_dir, force=False):
    root_path = Path(root_dir)

    for img_path in sorted(root_path.glob("**/*.jpeg")):
        if img_path.stem.endswith("-blur"):
            continue

        blur_path = img_path.with_name(f"{img_path.stem}-blur.jpeg")

        if blur_path.exists() and not force:
            continue

        with Image.open(img_path) as im:
            im = im.convert("RGB")
            width, height = im.size
            new_height = max(1, round(height * BLUR_WIDTH / width))
            im = im.resize((BLUR_WIDTH, new_height), Image.LANCZOS)

            buf = io.BytesIO()
            im.save(buf, "JPEG", quality=BLUR_QUALITY, optimize=True)

        blur_path.write_bytes(buf.getvalue())
        print(f"{blur_path.relative_to(root_path)}  {len(buf.getvalue())} bytes")


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parent.parent
    generate_blurs(
        repo_root / "public" / "static" / "travels",
        force="--force" in sys.argv,
    )
