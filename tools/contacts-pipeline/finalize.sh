#!/bin/bash
# Rebuild everything from the agent outputs: aggregate -> compile -> workbook -> upload chunks.
set -e
cd /tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad
python3 aggregate.py | tail -2
python3 compile.py > compile_stats.txt 2>&1 || true
cat compile_stats.txt
python3 build_xlsx.py
rm -rf sheets_chunks && mkdir -p sheets_chunks
python3 - <<'EOF'
import csv, json, os
SID = "1adUPt0aMzj5g7Kglfi3Qh-4dhQ0gxqZBYz_JkjA1nEU"
def chunks(csvfile, sheet, ncols, size, prefix):
    rows = list(csv.reader(open(csvfile)))
    for i in range(0, len(rows), size):
        block = rows[i:i + size]
        start, end = i + 1, i + len(block)
        rng = f"{sheet}!A{start}:{chr(64 + ncols)}{end}"
        body = {"range": rng, "majorDimension": "ROWS", "values": block}
        url = f"https://sheets.googleapis.com/v4/spreadsheets/{SID}/values/" + rng.replace(" ", "%20").replace("(", "%28").replace(")", "%29")
        json.dump({"url": url, "body": json.dumps(body, ensure_ascii=False)}, open(f"sheets_chunks/{prefix}_{i // size + 1:03d}.json", "w"), ensure_ascii=False)
    return len(rows)
n = chunks("final_contacts.csv", "Contacts", 22, 350, "contacts")
m = chunks("final_companies.csv", "Companies (enriched)", 18, 350, "companies")
print("chunks written:", len(os.listdir("sheets_chunks")), "| contacts rows", n, "| companies rows", m)
EOF
rm -f upload_log.txt
ls sheets_chunks | tr '\n' ' '; echo
