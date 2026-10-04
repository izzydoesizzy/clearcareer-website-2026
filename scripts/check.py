#!/usr/bin/env python3
"""
Quality gate for the whole repo.

  python3 scripts/check.py

Fails (exit 1) when it finds:
  - an em dash (U+2014) or en dash (U+2013) in any .html or .md file
  - a banned five-dollar word outside a quote (reported, not fatal)
  - an internal href/src that does not resolve to a file
  - a leading-slash href in site pages (breaks GitHub Pages sub-path hosting)
"""
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANNED = [r"leverag", r"\bunlock", r"empower", r"optimi[sz]", r"comprehensive", r"journey", r"navigat(e|ing|ed)\b", r"landscape",
          r"\belevate", r"transformative", r"game-changing", r"holistic", r"seamless", r"robust", r"\bdelve",
          r"in today's", r"at the end of the day", r"it's important to note", r"moving forward", r"in conclusion"]
SKIP_DIRS = {".git", "node_modules", "scripts"}
# Files that quote third parties or describe the gate itself; banned words there are expected.
WORD_EXEMPT = {"docs/SITE-BUILD-GUIDE.md", "plan/site-build-guide.html", "scripts/check.py", "README.md"}
LINK_EXEMPT = {"plan/site-build-guide.html"}  # documentation that shows markup examples

errors = 0
warnings = 0

def files(exts):
    for p in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.suffix in exts and p.is_file():
            yield p

for p in files({".html", ".md", ".txt"}):
    relp = p.relative_to(ROOT).as_posix()
    text = p.read_text(encoding="utf-8", errors="replace")
    for i, line in enumerate(text.splitlines(), 1):
        if "—" in line or "–" in line:
            print(f"DASH   {relp}:{i}: {line.strip()[:110]}")
            errors += 1
    if relp not in WORD_EXEMPT:
        for w in BANNED:
            for m in re.finditer(r"(?i)" + w, text):
                ln = text[: m.start()].count("\n") + 1
                print(f"WORD   {relp}:{ln}: {w}")
                warnings += 1

for p in files({".html"}):
    relp = p.relative_to(ROOT).as_posix()
    text = p.read_text(encoding="utf-8", errors="replace")
    for attr, url in re.findall(r'(href|src)="([^"]+)"', text):
        if url.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:", "{{")):
            continue
        if relp in LINK_EXEMPT:
            continue
        if url.startswith("/"):
            print(f"SLASH  {relp}: {attr}=\"{url}\" (leading slash breaks sub-path hosting)")
            errors += 1
            continue
        target = (p.parent / url.split("#")[0].split("?")[0]).resolve()
        if not target.exists():
            print(f"LINK   {relp}: {attr}=\"{url}\" -> missing")
            errors += 1
    if relp.startswith("site/") and text.count("<h1") != 1:
        print(f"H1     {relp}: {text.count('<h1')} h1 elements")
        warnings += 1

print(f"\n{errors} errors, {warnings} warnings")
sys.exit(1 if errors else 0)
