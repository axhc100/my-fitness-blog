#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auto Exercise Motion Demonstration Fetcher
Fetches standard exercise 3~5s demonstration animations from open exercise databases,
converts them to ultra-lightweight web-optimized MP4 (H.264, yuv420p),
and saves them directly into D:\my-blog-images\videos.
"""

import sys
import os
import json
import urllib.request
import subprocess
import re

DATASET_API_URL = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json"
CACHE_FILE = os.path.join(os.path.dirname(__file__), "exercises_cache.json")
OUTPUT_DIR = r"D:\my-blog-images\videos"

def get_exercises_db():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass

    print("[Info] Fetching exercises dataset index...", file=sys.stderr)
    req = urllib.request.Request(DATASET_API_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        # Save a lightweight index cache (only id, name, body_part, target, gif_url)
        indexed = []
        for item in data:
            indexed.append({
                "id": item.get("id"),
                "name": item.get("name"),
                "target": item.get("target"),
                "body_part": item.get("body_part"),
                "category": item.get("category"),
                "gif_url": item.get("gif_url")
            })
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(indexed, f, ensure_ascii=False)
        return indexed

def search_exercise(query, exercises):
    query_lower = query.lower().strip()
    # 1. Exact name match
    for ex in exercises:
        if ex["name"].lower() == query_lower:
            return ex
            
    # 2. Name contains query
    matches = [ex for ex in exercises if query_lower in ex["name"].lower()]
    if matches:
        # Prefer simpler/shorter standard compound movements
        matches.sort(key=lambda x: len(x["name"]))
        return matches[0]

    # 3. Target/body_part match
    for ex in exercises:
        if query_lower in ex.get("target", "").lower() or query_lower in ex.get("category", "").lower():
            return ex
            
    # Fallback to bodyweight squat
    return exercises[0]

def download_and_convert(exercise):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    slug = re.sub(r'[^a-zA-Z0-9_\-]+', '-', exercise["name"].lower()).strip('-')
    gif_path = os.path.join(OUTPUT_DIR, f"{slug}.gif")
    mp4_path = os.path.join(OUTPUT_DIR, f"{slug}.mp4")

    # Download GIF if not present
    gif_raw_url = f"https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/{exercise['gif_url']}"
    print(f"[Info] Downloading demo animation from: {gif_raw_url}", file=sys.stderr)
    
    req = urllib.request.Request(gif_raw_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        content = resp.read()
        with open(gif_path, "wb") as f:
            f.write(content)

    # Convert to MP4 using FFmpeg (h264, yuv420p for universal mobile auto-loop)
    cmd = [
        "ffmpeg", "-y", "-i", gif_path,
        "-movflags", "faststart",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v", "libx264",
        "-crf", "22",
        mp4_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    # Return output filenames
    mp4_filename = f"{slug}.mp4"
    gif_filename = f"{slug}.gif"
    return mp4_filename, gif_filename, exercise["name"]

def main():
    query = sys.argv[1] if len(sys.argv) > 1 else "squat"
    exercises = get_exercises_db()
    matched = search_exercise(query, exercises)
    print(f"[Info] Matched Exercise: {matched['name']} (Target: {matched['target']})", file=sys.stderr)
    mp4_name, gif_name, title = download_and_convert(matched)
    print(f"SUCCESS:{mp4_name}")
    print(f"TITLE:{title}")

if __name__ == "__main__":
    main()
