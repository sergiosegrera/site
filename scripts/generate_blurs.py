import os
import subprocess
from pathlib import Path

def generate_blurs(root_dir):
    root_path = Path(root_dir)
    for img_path in root_path.glob('**/*.jpeg'):
        if img_path.name.endswith('-blur.jpeg'):
            continue
            
        blur_path = img_path.parent / f"{img_path.stem}-blur.jpeg"
        
        if not blur_path.exists():
            print(f"Generating blur for {img_path}")
            # Ensure aspect ratio is kept with -1 in scale
            # We use a moderate size (width 200) to keep some detail while blurred
            # boxblur=10:1 applies a strong blur
            cmd = [
                'ffmpeg', '-i', str(img_path),
                '-vf', 'scale=200:-1,boxblur=10:1',
                '-q:v', '5', # Moderate quality
                str(blur_path)
            ]
            try:
                subprocess.run(cmd, check=True, capture_output=True)
            except subprocess.CalledProcessError as e:
                print(f"Error processing {img_path}: {e.stderr.decode()}")

if __name__ == "__main__":
    travels_dir = "/Users/sergio/web/site/public/static/travels"
    generate_blurs(travels_dir)
