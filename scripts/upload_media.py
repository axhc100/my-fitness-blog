#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Direct GitHub Media Uploader
Uploads images and videos directly to GitHub repo 'axhc100/my-blog-images' via REST API.
Immediately removes the local temporary file after successful upload.
Zero local disk retention.
"""

import sys
import os
import base64
import json
import urllib.request
import subprocess

REPO_OWNER = "axhc100"
REPO_NAME = "my-blog-images"
BRANCH = "main"

def get_github_token():
    """Retrieve GitHub token seamlessly from Windows Git Credential Manager."""
    try:
        proc = subprocess.run(
            ["git", "credential", "fill"],
            input="protocol=https\nhost=github.com\n",
            capture_output=True,
            text=True,
            check=True
        )
        for line in proc.stdout.splitlines():
            if line.startswith("password="):
                return line.split("=", 1)[1].strip()
    except Exception as e:
        print(f"[Error] Failed to get credential: {e}", file=sys.stderr)
    return None

def upload_file_to_github(local_file_path, remote_path=None, delete_local=True):
    """
    Uploads a file directly to GitHub repo contents API.
    If remote_path is omitted, it defaults to images/<filename> or videos/<filename>.
    """
    if not os.path.exists(local_file_path):
        raise FileNotFoundError(f"Local file not found: {local_file_path}")

    filename = os.path.basename(local_file_path)
    if remote_path is None:
        if filename.endswith((".mp4", ".webm", ".gif")):
            remote_path = f"videos/{filename}"
        else:
            remote_path = f"images/{filename}"

    token = get_github_token()
    if not token:
        raise RuntimeError("No GitHub authentication token found in Git Credential Manager.")

    with open(local_file_path, "rb") as f:
        file_bytes = f.read()

    b64_content = base64.b64encode(file_bytes).decode("utf-8")
    api_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{remote_path}"

    # Check if file already exists to get SHA (for updates)
    check_req = urllib.request.Request(
        f"{api_url}?ref={BRANCH}",
        headers={
            "Authorization": f"Bearer {token}",
            "User-Agent": "Antigravity-Uploader",
            "Accept": "application/vnd.github.v3+json"
        }
    )
    sha = None
    try:
        with urllib.request.urlopen(check_req) as resp:
            existing_info = json.loads(resp.read().decode("utf-8"))
            sha = existing_info.get("sha")
    except urllib.error.HTTPError as e:
        if e.code != 404:
            raise

    # Prepare upload payload
    payload = {
        "message": f"upload {remote_path} via direct API",
        "content": b64_content,
        "branch": BRANCH
    }
    if sha:
        payload["sha"] = sha

    req = urllib.request.Request(
        api_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "User-Agent": "Antigravity-Uploader",
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
        method="PUT"
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode("utf-8"))

    cdn_url = f"https://cdn.jsdelivr.net/gh/{REPO_OWNER}/{REPO_NAME}@{BRANCH}/{remote_path}"
    raw_url = f"https://raw.githubusercontent.com/{REPO_OWNER}/{REPO_NAME}/{BRANCH}/{remote_path}"

    # Delete local file if requested
    if delete_local:
        try:
            os.remove(local_file_path)
            print(f"[Info] Local file deleted: {local_file_path}", file=sys.stderr)
        except Exception as e:
            print(f"[Warning] Could not remove local file: {e}", file=sys.stderr)

    return {
        "cdn_url": cdn_url,
        "raw_url": raw_url,
        "remote_path": remote_path
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python upload_media.py <local_file_path> [remote_path] [--keep-local]", file=sys.stderr)
        sys.exit(1)

    local_path = sys.argv[1]
    remote_path = None
    delete_local = True

    if len(sys.argv) > 2 and not sys.argv[2].startswith("--"):
        remote_path = sys.argv[2]

    if "--keep-local" in sys.argv:
        delete_local = False

    res = upload_file_to_github(local_path, remote_path, delete_local=delete_local)
    print(f"SUCCESS:{res['cdn_url']}")
    print(f"RAW_URL:{res['raw_url']}")

if __name__ == "__main__":
    main()
