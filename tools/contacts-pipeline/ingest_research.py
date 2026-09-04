"""Ingest saved research tool-result files into research/round_N.json.
Usage: python3 ingest_research.py <round> <file1> [file2 ...]"""
import json, sys, os
from collections import Counter
from emailpat import norm
rnd = sys.argv[1]; files = sys.argv[2:]
todo = json.load(open(f"research/todo_round_{rnd}.json"))
out_fn = f"research/round_{rnd}.json"
out = json.load(open(out_fn)) if os.path.exists(out_fn) else []
done = {x["name"] for x in out if x.get("status") == "done"}
by_sid = {t["searchResultId"]: t for t in todo if t["searchResultId"]}
by_name = {(norm(t["first"])[:3], norm(t["last"])): t for t in todo}
pending = []
for fn in files:
    d = json.load(open(fn)); res = d.get("results") or []
    for x in res:
        st = x.get("status"); ct = x.get("contact") or {}
        t = by_sid.get(x.get("searchResultId"))
        if not t and ct:
            t = by_name.get((norm(ct.get("firstName", ""))[:3], norm(ct.get("lastName", ""))))
        if st == "done" and ct:
            if t and t["name"] not in done:
                out.append({"company_id": t["company_id"], "name": t["name"], "status": "done", "contact": ct, "searchResultId": x.get("searchResultId") or ""}); done.add(t["name"])
            elif not t:
                out.append({"company_id": None, "name": ct.get("fullName", ""), "status": "done", "contact": ct, "searchResultId": x.get("searchResultId") or ""})
        elif st in ("error", "missing", "not found"):
            if t and t["name"] not in done:
                out.append({"company_id": t["company_id"], "name": t["name"], "status": st, "contact": {}, "message": str(x.get("message"))[:150]})
        else:  # pending / researching / duplicate
            rid = x.get("requestId")
            if st == "duplicate":
                try: rid = json.loads(str(x.get("additionalData")).replace("'", '"')).get("initialRequestId") or rid
                except Exception: pass
            if rid: pending.append(rid)
    pending += [r for r in (d.get("requestIds") or []) if r]
json.dump(out, open(out_fn, "w"), indent=1)
pend = sorted(set(pending))
json.dump(pend, open(f"research/r{rnd}_pending.json", "w"))
unresolved = [t["name"] for t in todo if t["name"] not in {x["name"] for x in out}]
print(f"round {rnd}: entries {len(out)} {dict(Counter(x['status'] for x in out))} | pending ids {len(pend)} | unresolved todo {len(unresolved)}")
print("PENDING:", json.dumps(pend))
