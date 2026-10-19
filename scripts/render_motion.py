"""
FitKit Motion Lab: Motion Animator Helper Script
Generates 3~5 second seamless loop MP4 & GIF motion clips for key exercise demonstrations.
Supported actions:
- squat: Barbell squat depth and knee kinematics
- stretch: Hamstring / Splits flexibility mobility flow
- yoga: Cat-Cow / Cobra spine mobility flow
- plank: Core stability & breathing loop
"""

import math
import os
import sys
import uuid
import subprocess
from PIL import Image, ImageDraw

def render_motion(action="squat", output_dir=r"D:\my-blog-images"):
    WIDTH, HEIGHT = 1080, 608
    FPS = 30
    DURATION = 3.6
    TOTAL_FRAMES = int(FPS * DURATION)
    
    clip_id = str(uuid.uuid4())
    temp_dir = os.path.join(output_dir, f"temp_{clip_id}")
    os.makedirs(temp_dir, exist_ok=True)
    
    floor_y = 520
    cx = WIDTH // 2

    for i in range(TOTAL_FRAMES):
        t = i / TOTAL_FRAMES
        depth = (1.0 - math.cos(t * 2 * math.pi)) / 2.0
        
        img = Image.new("RGB", (WIDTH, HEIGHT), color=(15, 23, 42))  # Slate 900
        draw = ImageDraw.Draw(img)

        # Background grid
        for x in range(0, WIDTH, 60):
            draw.line([(x, 0), (x, HEIGHT)], fill=(30, 41, 59), width=1)
        for y in range(0, HEIGHT, 60):
            draw.line([(0, y), (WIDTH, y)], fill=(30, 41, 59), width=1)

        # Platform
        draw.line([(100, floor_y), (WIDTH - 100, floor_y)], fill=(51, 65, 85), width=4)

        if action == "yoga" or action == "stretch":
            # Cat-Cow / Spine mobility wave or stretching
            # Hands on floor
            hand_x, hand_y = cx - 120, floor_y - 10
            knee_x, knee_y = cx + 120, floor_y - 10
            spine_arch = math.sin(t * 2 * math.pi) * 35 # Positive = cat, Negative = cow
            mid_back_y = 380 + spine_arch
            mid_back_x = cx
            shoulder_x, shoulder_y = hand_x + 20, 390 - spine_arch * 0.3
            hip_x, hip_y = knee_x - 20, 390 - spine_arch * 0.3
            head_x, head_y = shoulder_x - 30, shoulder_y - (20 if spine_arch < 0 else -15)

            # Draw body
            draw.line([(hand_x, hand_y), (shoulder_x, shoulder_y)], fill=(255, 255, 255), width=8)
            draw.line([(knee_x, knee_y), (hip_x, hip_y)], fill=(255, 255, 255), width=8)
            draw.line([(shoulder_x, shoulder_y), (mid_back_x, mid_back_y)], fill=(59, 130, 246), width=10)
            draw.line([(mid_back_x, mid_back_y), (hip_x, hip_y)], fill=(59, 130, 246), width=10)
            draw.ellipse([head_x - 16, head_y - 16, head_x + 16, head_y + 16], fill=(226, 232, 240), outline=(59, 130, 246), width=2)
            
            # Joints
            for jx, jy in [(hand_x, hand_y), (knee_x, knee_y), (shoulder_x, shoulder_y), (hip_x, hip_y), (mid_back_x, mid_back_y)]:
                draw.ellipse([jx - 6, jy - 6, jx + 6, jy + 6], fill=(96, 165, 250), outline=(255, 255, 255), width=2)

            title_text = "FITKIT MOTION LAB - SPINE & MOBILITY FLOW"
            phase_name = "CAT POSE (Flexion)" if spine_arch > 0 else "COW POSE (Extension)"

        else:
            # Default: Squat / Leg / Functional
            hip_y = 360 + depth * 90
            hip_x = cx - depth * 35
            knee_y = 440 + depth * 30
            knee_x = cx + 55 + depth * 25
            ankle_x = cx + 45
            ankle_y = floor_y - 10
            shoulder_y = hip_y - 130 + depth * 20
            shoulder_x = hip_x + 35 + depth * 20
            head_x, head_y = shoulder_x + 5, shoulder_y - 35

            # Barbell
            bar_y = shoulder_y - 5
            draw.line([(shoulder_x - 140, bar_y), (shoulder_x + 140, bar_y)], fill=(203, 213, 225), width=6)
            draw.rounded_rectangle([shoulder_x - 155, bar_y - 45, shoulder_x - 140, bar_y + 45], radius=4, fill=(59, 130, 246))
            draw.rounded_rectangle([shoulder_x + 140, bar_y - 45, shoulder_x + 155, bar_y + 45], radius=4, fill=(59, 130, 246))

            # Bones
            draw.line([(shoulder_x, shoulder_y), (hip_x, hip_y)], fill=(255, 255, 255), width=10)
            draw.line([(hip_x, hip_y), (knee_x, knee_y)], fill=(59, 130, 246), width=10)
            draw.line([(knee_x, knee_y), (ankle_x, ankle_y)], fill=(255, 255, 255), width=10)
            draw.line([(ankle_x - 15, ankle_y), (ankle_x + 35, ankle_y)], fill=(148, 163, 184), width=6)
            draw.line([(shoulder_x, shoulder_y), (shoulder_x + 25, shoulder_y + 25)], fill=(148, 163, 184), width=6)
            draw.line([(shoulder_x + 25, shoulder_y + 25), (shoulder_x + 100, bar_y)], fill=(148, 163, 184), width=6)
            draw.ellipse([head_x - 18, head_y - 18, head_x + 18, head_y + 18], fill=(226, 232, 240), outline=(59, 130, 246), width=3)

            for jx, jy in [(hip_x, hip_y), (knee_x, knee_y), (ankle_x, ankle_y), (shoulder_x, shoulder_y)]:
                draw.ellipse([jx - 7, jy - 7, jx + 7, jy + 7], fill=(96, 165, 250), outline=(255, 255, 255), width=2)

            title_text = "FITKIT MOTION LAB - KINEMATICS DEMO"
            knee_angle = int(170 - depth * 90)
            phase_name = f"Knee Angle: {knee_angle} deg | Depth: {int(depth*100)}%"

        # HUD Overlay
        draw.rectangle([40, 30, 420, 105], fill=(30, 41, 59), outline=(51, 65, 85), width=1)
        draw.text((55, 42), title_text, fill=(148, 163, 184))
        draw.text((55, 70), phase_name, fill=(59, 130, 246) if depth > 0.8 else (16, 185, 129))

        img.save(os.path.join(temp_dir, f"frame_{i:04d}.png"))

    out_mp4_name = f"motion_{clip_id}.mp4"
    out_mp4_path = os.path.join(output_dir, out_mp4_name)

    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(temp_dir, "frame_%04d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "20",
        out_mp4_path
    ]
    subprocess.run(cmd, check=True)

    # Cleanup temp frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

    print(f"SUCCESS:{out_mp4_name}")
    return out_mp4_name

if __name__ == "__main__":
    act = sys.argv[1] if len(sys.argv) > 1 else "squat"
    render_motion(act)
