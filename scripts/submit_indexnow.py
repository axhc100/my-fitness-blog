#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FitKit IndexNow Instant Search Engine Indexing Submitter
Submits updated or new URLs directly to Microsoft Bing, Yandex, Seznam, and Naver
via the official IndexNow protocol.
"""

import sys
import os
import json
import urllib.request
import re

INDEXNOW_KEY = "4ca3038f39ce446e8b2ff7eb3e038a9d"
HOST = "www.fitkit.top"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"
INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
]

TOOL_SLUGS = ["splits", "macro", "bfp", "bmr", "water", "ibw", "hr"]

def get_all_site_urls():
    urls = [
        f"https://{HOST}/en",
        f"https://{HOST}/zh",
    ]
    # Tools
    for lang in ["en", "zh"]:
        for tool in TOOL_SLUGS:
            urls.append(f"https://{HOST}/{lang}/tools/{tool}")

    # Articles
    base_content_dir = os.path.join(os.path.dirname(__file__), "..", "content")
    for lang in ["en", "zh"]:
        lang_dir = os.path.join(base_content_dir, lang)
        if os.path.exists(lang_dir):
            for root, _, files in os.walk(lang_dir):
                for f in files:
                    if f.endswith(".md"):
                        slug = os.path.splitext(f)[0]
                        urls.append(f"https://{HOST}/{lang}/blog/{slug}")

    return sorted(list(set(urls)))

def submit_urls_to_indexnow(urls):
    if not urls:
        print("[Info] No URLs to submit.", file=sys.stderr)
        return False

    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    data_bytes = json.dumps(payload, indent=2).encode("utf-8")
    success = False

    for endpoint in INDEXNOW_ENDPOINTS:
        try:
            req = urllib.request.Request(
                endpoint,
                data=data_bytes,
                headers={
                    "Content-Type": "application/json; charset=utf-8",
                    "User-Agent": "FitKit-IndexNow-Submitter"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                print(f"[Success] {endpoint} returned status {resp.status} ({resp.reason})")
                success = True
        except urllib.error.HTTPError as e:
            # 200 = OK, 202 = Accepted
            print(f"[HTTP] {endpoint} response: {e.code} {e.reason}", file=sys.stderr)
            if e.code in (200, 202):
                success = True
        except Exception as e:
            print(f"[Warning] Failed to submit to {endpoint}: {e}", file=sys.stderr)

    return success

def main():
    if len(sys.argv) > 1 and not sys.argv[1].startswith("--"):
        # Specific URLs passed via CLI arguments
        target_urls = sys.argv[1:]
    else:
        # Full site batch crawl submission
        target_urls = get_all_site_urls()

    print(f"[IndexNow] Submitting {len(target_urls)} URLs for {HOST}...")
    ok = submit_urls_to_indexnow(target_urls)
    if ok:
        print(f"SUCCESS: Submitted {len(target_urls)} URLs to IndexNow (Bing/Yandex).")
    else:
        print("[IndexNow] Submission completed with warnings.")

if __name__ == "__main__":
    main()
