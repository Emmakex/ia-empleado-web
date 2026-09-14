from pathlib import Path
import math
import os
import subprocess

import cairosvg
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/branding/video/home"
TMP = ROOT / ".phase8d-video-tmp"
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

W, H, FPS, DURATION = 1920, 1080, 12, 18.0
FRAME_COUNT = int(FPS * DURATION)
CENTER = (960, 515)
ORDER = ["clara", "alex", "sofia", "javier"]
SVG = {
    "clara": "public/branding/characters/clara-customer-support.svg",
    "alex": "public/branding/characters/alex-administrative.svg",
    "sofia": "public/branding/characters/sofia-accounting.svg",
    "javier": "public/branding/characters/javier-sales.svg",
}
COLORS = {
    "clara": (59, 130, 246),
    "alex": (139, 92, 246),
    "sofia": (34, 198, 168),
    "javier": (245, 158, 11),
}
START = {
    "clara": (240, 250),
    "alex": (580, 760),
    "sofia": (1340, 760),
    "javier": (1680, 250),
}
FINAL = {
    "clara": (350, 215),
    "alex": (680, 665),
    "sofia": (1240, 665),
    "javier": (1570, 215),
}


def smooth(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3 - 2 * value)


def ease(value):
    value = max(0.0, min(1.0, value))
    return 1 - (1 - value) ** 3


def lerp(a, b, value):
    return a + (b - a) * value


def reveal(t, start, end):
    if t >= end:
        return 1.0
    return smooth((t - start) / (end - start))


def paste_center(canvas, image, x, y, scale=1.0, alpha=1.0):
    if scale != 1.0:
        image = image.resize(
            (int(image.width * scale), int(image.height * scale)),
            Image.Resampling.LANCZOS,
        )
    if alpha < 1.0:
        image = image.copy()
        image.putalpha(image.getchannel("A").point(lambda value: int(value * alpha)))
    canvas.alpha_composite(image, (int(x - image.width / 2), int(y - image.height / 2)))


def dashed_orbit(draw, radius, phase, opacity):
    box = (
        CENTER[0] - radius,
        CENTER[1] - radius,
        CENTER[0] + radius,
        CENTER[1] + radius,
    )
    for angle in range(0, 360, 21):
        start = angle + phase
        draw.arc(box, start, start + 7, fill=(91, 95, 245, opacity), width=2)


for name, path in SVG.items():
    cairosvg.svg2png(
        url=str(ROOT / path),
        write_to=str(TMP / f"{name}.png"),
        output_width=360,
        output_height=405,
    )

cairosvg.svg2png(
    url=str(ROOT / "public/branding/ia-empleado-mark.svg"),
    write_to=str(TMP / "mark.png"),
    output_width=220,
    output_height=220,
)

PORTRAITS = {name: Image.open(TMP / f"{name}.png").convert("RGBA") for name in ORDER}
MARK = Image.open(TMP / "mark.png").convert("RGBA")

# Pre-render the branded atmospheric background once.
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
xx /= W

yy /= H
spots = [
    (((xx - 0.50) ** 2 / 0.35 + (yy - 0.46) ** 2 / 0.45), 0.055, np.array([91, 95, 245])),
    (((xx - 0.14) ** 2 / 0.18 + (yy - 0.82) ** 2 / 0.25), 0.025, np.array([36, 201, 194])),
    (((xx - 0.87) ** 2 / 0.20 + (yy - 0.18) ** 2 / 0.22), 0.025, np.array([124, 131, 255])),
]
base = np.zeros((H, W, 3), dtype=np.float32)
base[:] = [249, 250, 253]
for distance, strength, color in spots:
    alpha = np.clip(1 - distance, 0, 1) * strength
    base = base * (1 - alpha[..., None]) + color * alpha[..., None]
BACKGROUND = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")
mist = Image.new("RGBA", (W, H), (0, 0, 0, 0))
md = ImageDraw.Draw(mist)
md.ellipse((480, 140, 1440, 990), fill=(91, 95, 245, 15))
md.ellipse((80, 560, 920, 1180), fill=(36, 201, 194, 12))
md.ellipse((1180, -100, 2080, 650), fill=(124, 77, 255, 11))
BACKGROUND = Image.alpha_composite(BACKGROUND, mist.filter(ImageFilter.GaussianBlur(90)))


def frame_at(t):
    frame = BACKGROUND.copy()
    draw = ImageDraw.Draw(frame, "RGBA")

    # 00:00–00:03: people first, with quiet brand geometry.
    for radius, opacity in [(300, 30), (410, 22), (525, 15)]:
        dashed_orbit(draw, radius, (t * 3.1) % 21, opacity)

    people_alpha = reveal(t, 0.2, 2.4)
    settle = ease((t - 0.3) / 2.7)
    for index, name in enumerate(ORDER):
        sx, sy = START[name]
        fx, fy = FINAL[name]
        drift = math.sin(t * 0.7 + index * 1.4) * 3 if t > 2.4 else 0
        paste_center(
            frame,
            PORTRAITS[name],
            lerp(sx, fx, settle),
            lerp(sy, fy, settle) + drift,
            0.78 + 0.08 * settle,
            people_alpha,
        )

    # 00:03–00:07: IA core and role connections join the team.
    core_alpha = reveal(t, 2.7, 4.2)
    if core_alpha:
        for radius, opacity in [(150, 8), (110, 12), (72, 18)]:
            draw.ellipse(
                (CENTER[0] - radius, CENTER[1] - radius, CENTER[0] + radius, CENTER[1] + radius),
                fill=(91, 95, 245, int(opacity * core_alpha)),
            )
        paste_center(frame, MARK, *CENTER, 0.65 + 0.35 * ease((t - 2.7) / 1.8), core_alpha)
        connection_alpha = reveal(t, 3.5, 6.8)
        for name, (x, y) in FINAL.items():
            progress = min(1, max(0, (t - 3.5 - ORDER.index(name) * 0.35) / 1.8))
            draw.line(
                (CENTER[0], CENTER[1], lerp(CENTER[0], x, progress), lerp(CENTER[1], y, progress)),
                fill=(*COLORS[name], int(105 * connection_alpha)),
                width=3,
            )

    # 00:07–00:11: existing systems connect without fake dashboards or metrics.
    systems_alpha = reveal(t, 6.7, 8.4)
    systems = [(970, 140), (1510, 520), (1330, 300), (600, 300), (410, 540), (960, 880)]
    if systems_alpha:
        for index, (x, y) in enumerate(systems):
            size = 24 if index % 2 == 0 else 20
            draw.line((CENTER[0], CENTER[1], x, y), fill=(91, 95, 245, int(45 * systems_alpha)), width=2)
            draw.rounded_rectangle(
                (x - size, y - size, x + size, y + size),
                radius=9,
                fill=(255, 255, 255, int(235 * systems_alpha)),
                outline=(91, 95, 245, int(110 * systems_alpha)),
                width=2,
            )
            if index % 3 == 0:
                draw.ellipse((x - 7, y - 7, x + 7, y + 7), outline=(91, 95, 245, 190), width=2)
            elif index % 3 == 1:
                draw.line((x - 8, y, x + 8, y), fill=(36, 201, 194, 200), width=3)
                draw.line((x, y - 8, x, y + 8), fill=(36, 201, 194, 200), width=3)
            else:
                draw.polygon([(x, y - 9), (x + 9, y), (x, y + 9), (x - 9, y)], outline=(124, 77, 255, 190))
        progress = smooth(((t - 7.4) % 2.6) / 2.6)
        sx, sy = systems[0]
        px, py = lerp(sx, CENTER[0], progress), lerp(sy, CENTER[1], progress)
        draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(36, 201, 194, 220))

    # 00:11–00:15: a visible handoff ends at a separate human-control checkpoint.
    handoff_alpha = reveal(t, 10.7, 11.8)
    if handoff_alpha:
        javier, clara, approval = FINAL["javier"], FINAL["clara"], (960, 790)
        if t < 13:
            progress = smooth((t - 11) / 2)
            x, y = lerp(javier[0], clara[0], progress), lerp(javier[1], clara[1], progress)
        else:
            progress = smooth((t - 13) / 1.4)
            x, y = lerp(clara[0], approval[0], progress), lerp(clara[1], approval[1], progress)
        draw.line((*javier, *clara), fill=(91, 95, 245, int(70 * handoff_alpha)), width=4)
        draw.line((*clara, *approval), fill=(36, 201, 194, int(75 * handoff_alpha)), width=4)
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(91, 95, 245, 230))
        if t > 13.7:
            alpha = reveal(t, 13.7, 14.4)
            draw.rounded_rectangle(
                (approval[0] - 64, approval[1] - 48, approval[0] + 64, approval[1] + 48),
                18,
                fill=(255, 255, 255, int(245 * alpha)),
                outline=(16, 185, 129, int(180 * alpha)),
                width=3,
            )
            draw.ellipse((approval[0] - 17, approval[1] - 17, approval[0] + 17, approval[1] + 17), fill=(16, 185, 129, 210))
            draw.line((approval[0] - 8, approval[1], approval[0] - 1, approval[1] + 8, approval[0] + 12, approval[1] - 9), fill=(255, 255, 255, 245), width=4)

    # 00:15–00:18: resolve the network into the IA Empleado mark and poster-compatible endpoint.
    team_alpha = reveal(t, 14.7, 16.0)
    if team_alpha:
        draw.ellipse((385, 40, 1535, 990), outline=(91, 95, 245, int(34 * team_alpha)), width=3)
        draw.ellipse((430, 85, 1490, 945), outline=(36, 201, 194, int(24 * team_alpha)), width=2)

    if t >= 16.7:
        progress = smooth((t - 16.7) / 1.3)
        frame = Image.alpha_composite(frame, Image.new("RGBA", (W, H), (249, 250, 253, int(185 * progress))))
        paste_center(frame, MARK, CENTER[0], CENTER[1] - 10, 0.85 + 0.45 * progress)
        draw = ImageDraw.Draw(frame, "RGBA")
        draw.ellipse((750, 305, 1170, 725), outline=(91, 95, 245, int(24 + 28 * progress)), width=3)
        draw.ellipse((660, 215, 1260, 815), outline=(36, 201, 194, int(16 + 18 * progress)), width=2)

    return frame.convert("RGB")


mp4 = OUT / "ia-empleado-brand-story.mp4"
webm = OUT / "ia-empleado-brand-story.webm"
poster = OUT / "ia-empleado-brand-story-poster.webp"

process = subprocess.Popen(
    [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-r", "24", "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "27",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4),
    ],
    stdin=subprocess.PIPE,
)
for index in range(FRAME_COUNT):
    process.stdin.write(frame_at(index / FPS).tobytes())
process.stdin.close()
if process.wait():
    raise SystemExit("MP4 encoding failed")

frame_at(16.3).save(poster, "WEBP", quality=82, method=6)
subprocess.run(
    [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-an",
        "-c:v", "libvpx-vp9", "-crf", "39", "-b:v", "0", "-deadline", "realtime",
        "-cpu-used", "6", "-row-mt", "1", "-pix_fmt", "yuv420p", str(webm),
    ],
    check=True,
)

print("Phase 8D home brand story generated", {
    "mp4": os.path.getsize(mp4),
    "webm": os.path.getsize(webm),
    "poster": os.path.getsize(poster),
    "duration": DURATION,
    "size": f"{W}x{H}",
})
