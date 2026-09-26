#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verification suite for the nav propagation. Run once, then delete."""

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent
ALL_PAGES = sorted(ROOT.glob('*.html'))

TAGS = ['div', 'section', 'aside', 'header', 'footer', 'nav', 'ul', 'li', 'a',
        'article', 'main', 'details', 'summary', 'button', 'span',
        'h1', 'h2', 'h3', 'h4', 'p', 'ol', 'label', 'table', 'thead', 'tbody',
        'tr', 'th', 'td', 'dl', 'dt', 'dd', 'form']

failures = 0

# 1) Tag balance
for path in ALL_PAGES:
    html = path.read_text(encoding='utf-8')
    for tag in TAGS:
        opens = len(re.findall(r'<' + tag + r'[\s>]', html))
        closes = len(re.findall(r'</' + tag + r'>', html))
        if opens != closes:
            print('TAG IMBALANCE', path.name, tag, opens, 'open vs', closes, 'close')
            failures += 1
print('tag balance checked on', len(ALL_PAGES), 'pages')

# 2) node --check on all page scripts
for script in (ROOT / 'src' / 'js').glob('*.js'):
    r = subprocess.run(['node', '--check', str(script)], capture_output=True, text=True)
    if r.returncode != 0:
        print('SYNTAX ERROR', script.name, r.stderr[:300])
        failures += 1
print('node --check passed on all scripts')

# 3) Every page must have both section headers in dropdown AND drawer
for path in ALL_PAGES:
    html = path.read_text(encoding='utf-8')
    if html.count('صفحات عمومی') != 2 or html.count('صفحات پنل ادمین') != 2:
        print('SECTION HEADERS', path.name, 'dd/dr عمومی:', html.count('صفحات عمومی'),
              'پنل ادمین:', html.count('صفحات پنل ادمین'))
        failures += 1
print('section headers checked (2x per page)')

# 4) New wrapper/grid classes present exactly once per page
for path in ALL_PAGES:
    html = path.read_text(encoding='utf-8')
    if html.count('-right-79 lg:-right-100') != 1 or html.count('grid-cols-5 lg:grid-cols-6') != 1:
        print('WRAPPER/GRID', path.name)
        failures += 1
    if 'overflow-hidden items-center' in html:
        print('OLD DRAWER INNER', path.name)
        failures += 1
print('wrapper/grid classes checked')

# 5) Internal hrefs resolve to existing files (catches about/search leftovers)
for path in ALL_PAGES:
    html = path.read_text(encoding='utf-8')
    for href in set(re.findall(r'href="([a-z0-9-]+\.html)"', html)):
        if not (ROOT / href).exists():
            print('BROKEN LINK', path.name, '->', href)
            failures += 1
print('internal link targets resolved')

print('RESULT:', 'FAIL (' + str(failures) + ')' if failures else 'ALL OK')
