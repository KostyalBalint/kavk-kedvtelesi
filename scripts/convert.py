#!/usr/bin/env python3
"""Convert the KAVK Excel question banks (shipped as zips in the project root)
into the mutual JSON format consumed by the React app.

Outputs:
  public/data/index.json          - bank registry
  public/data/<bankId>.json       - one file per bank
  public/data/img/<bankId>/...    - referenced images

Run:  python scripts/convert.py
Deps: pandas, openpyxl (xlsx), python-calamine (xls)
"""
import json
import os
import shutil
import sys
import tempfile
import zipfile

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DATA = os.path.join(ROOT, "public", "data")
OUT_IMG = os.path.join(OUT_DATA, "img")

# Each bank: how to locate its source workbook inside the extracted zips and how
# to read it. `match` is a substring of the extracted file path.
BANKS = [
    {
        "id": "tengeri",
        "title": "Tengeri kishajó (IV. o.)",
        "match": "tengeri kishaj",
        "ext": ".xlsx",
        "engine": "openpyxl",
        "sheet": "Tesztkérdések",
        "layout": "B",
    },
    {
        "id": "belvizi",
        "title": "Belvízi hajózási szabályzat",
        "match": "Belvízi_kedvtelési_HSz",
        "ext": ".xlsx",
        "engine": "openpyxl",
        "sheet": "2024_02_01_kérdések",
        "layout": "C",
    },
    {
        "id": "vitorlas",
        "title": "Vitorlás kishajó",
        "match": "Vitorlas_kishajo",
        "ext": ".xls",
        "engine": "calamine",
        "sheet": 0,
        "layout": "A",
    },
    {
        "id": "kisgephajo",
        "title": "Kisgéphajó",
        "match": "Kisgephajo",
        "ext": ".xls",
        "engine": "calamine",
        "sheet": "2022_kisgephajo",
        "layout": "A",
    },
]


def extract_zips(dest):
    """Extract every zip in the project root, fixing cp437-mojibake names."""
    for name in os.listdir(ROOT):
        if not name.endswith(".zip"):
            continue
        with zipfile.ZipFile(os.path.join(ROOT, name)) as zf:
            for info in zf.infolist():
                if info.is_dir():
                    continue
                try:
                    fixed = info.filename.encode("cp437").decode("utf-8")
                except (UnicodeEncodeError, UnicodeDecodeError):
                    fixed = info.filename
                tgt = os.path.join(dest, fixed)
                os.makedirs(os.path.dirname(tgt), exist_ok=True)
                with zf.open(info) as src, open(tgt, "wb") as dst:
                    dst.write(src.read())


def find_file(extract_dir, match, ext):
    for r, _, files in os.walk(extract_dir):
        for f in files:
            if match in os.path.join(r, f) and f.endswith(ext):
                return os.path.join(r, f)
    return None


def clean(v):
    if v is None:
        return None
    s = str(v).strip()
    if s == "" or s.lower() == "nan":
        return None
    return s


def parse_AB(df):
    """Layouts A/B: col1=question, col2=correct, col3/4=wrong. (img handled separately)"""
    out = []
    for _, row in df.iterrows():
        r = row.tolist()
        q = clean(r[1])
        correct = clean(r[2])
        if not q or not correct:
            continue
        opts = [{"text": correct, "correct": True}]
        for idx in (3, 4):
            w = clean(r[idx]) if idx < len(r) else None
            if w:
                opts.append({"text": w, "correct": False})
        out.append({"question": q, "options": opts})
    return out


def parse_C(df):
    """Belvízi: Kérdés | V1 | V1 helyes | V2 | V2 helyes | V3 | V3 helyes | ... ."""
    out = []
    for _, row in df.iterrows():
        q = clean(row["Kérdés"])
        if not q:
            continue
        opts = []
        for n in (1, 2, 3):
            text = clean(row.get(f"Válasz{n}"))
            flag = clean(row.get(f"Válasz{n} helyes"))
            if not text:
                continue
            opts.append({"text": text, "correct": (flag or "").lower() == "igen"})
        if not any(o["correct"] for o in opts):
            continue
        out.append({"question": q, "options": opts})
    return out


def image_for_row_AB(row):
    r = row.tolist()
    for idx in (5, 6):
        v = clean(r[idx]) if idx < len(r) else None
        if v:
            return v
    return None


def image_for_row_C(row):
    return clean(row.get("Kép"))


def build_bank(bank, extract_dir):
    src = find_file(extract_dir, bank["match"], bank["ext"])
    if not src:
        print(f"  !! source not found for {bank['id']} (match={bank['match']})")
        return None
    df = pd.read_excel(src, engine=bank["engine"], sheet_name=bank["sheet"], header=0)
    src_dir = os.path.dirname(src)

    if bank["layout"] in ("A", "B"):
        records = parse_AB(df)
        img_getter = image_for_row_AB
    else:
        records = parse_C(df)
        img_getter = image_for_row_C

    # attach images (iterate raw rows again, keeping only the rows we kept)
    img_dir = os.path.join(OUT_IMG, bank["id"])
    os.makedirs(img_dir, exist_ok=True)
    missing = 0
    # Re-walk to align images with kept records: rebuild in one pass instead.
    questions = []
    rec_iter = iter(records)
    # Because parse_* skipped some rows, re-run the same skip logic here to align.
    number = 0
    for _, row in df.iterrows():
        if bank["layout"] in ("A", "B"):
            r = row.tolist()
            q = clean(r[1])
            correct = clean(r[2])
            if not q or not correct:
                continue
        else:
            q = clean(row["Kérdés"])
            if not q:
                continue
            # ensure it had a correct option, mirroring parse_C
            has_correct = any(
                (clean(row.get(f"Válasz{n} helyes")) or "").lower() == "igen"
                for n in (1, 2, 3)
            )
            if not has_correct:
                continue
        rec = next(rec_iter)
        number += 1
        img = img_getter(row)
        img_field = None
        if img:
            srcimg = os.path.join(src_dir, img)
            if os.path.exists(srcimg):
                shutil.copy2(srcimg, os.path.join(img_dir, img))
                img_field = f"{bank['id']}/{img}"
            else:
                missing += 1
        questions.append(
            {
                "id": f"{bank['id']}-{number}",
                "number": number,
                "question": rec["question"],
                "options": rec["options"],
                "image": img_field,
            }
        )

    if missing:
        print(f"  ~ {bank['id']}: {missing} referenced images missing from zip")
    with open(os.path.join(OUT_DATA, f"{bank['id']}.json"), "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=1)
    print(f"  ✓ {bank['id']}: {len(questions)} questions")
    return {"id": bank["id"], "title": bank["title"], "count": len(questions)}


def main():
    os.makedirs(OUT_DATA, exist_ok=True)
    os.makedirs(OUT_IMG, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        print("Extracting zips...")
        extract_zips(tmp)
        index = []
        for bank in BANKS:
            entry = build_bank(bank, tmp)
            if entry:
                index.append(entry)
    with open(os.path.join(OUT_DATA, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=1)
    total = sum(e["count"] for e in index)
    print(f"index.json written. {len(index)} banks, {total} questions total.")


if __name__ == "__main__":
    sys.exit(main())
