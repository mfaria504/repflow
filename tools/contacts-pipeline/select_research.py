"""Pick which contacts to spend Seamless research credits on.

Usage: python3 select_research.py <round> <max_credits> [--second]
Writes research/todo_round_<round>.json and updates research/selected.json.

Rule: one decision-maker per company (lowest title rank; prefer Seamless-backed records with a
searchResultId; prefer people without a listed email). With --second, also pick a second
decision-maker for Tier A / B companies that already got their first.
"""
import glob
import json
import os
import re
import sys

BASE = "/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad"
sys.path.insert(0, BASE)
from aggregate import rank_title  # noqa: E402  (re-runs aggregation, cheap)

rnd = int(sys.argv[1])
budget = int(sys.argv[2])
second = "--second" in sys.argv

os.makedirs(f"{BASE}/research", exist_ok=True)
sel_path = f"{BASE}/research/selected.json"
selected = json.load(open(sel_path)) if os.path.exists(sel_path) else {}  # company_id -> [names]

contacts = json.load(open(f"{BASE}/contacts_raw.json"))
companies = {c["id"]: c for c in json.load(open(f"{BASE}/companies.json"))}

by_comp = {}
for c in contacts:
    by_comp.setdefault(c["company_id"], []).append(c)

GENERIC_LOCAL = re.compile(r"^(sales|info|office|contact|admin|orders|support|hello|mail)@")


def score(c):
    # lower is better
    s = c["title_rank"] * 10
    if not c.get("searchResultId"):
        s += 4  # name-based research is less reliable
    if c.get("email") and not GENERIC_LOCAL.match(c["email"]):
        s += 6  # already has a listed email; lower priority
    if not c.get("linkedin"):
        s += 2
    return s


todo = []
tier_order = {"A - High Priority": 0, "B - Medium Priority": 1, "C - Standard": 2}
comp_ids = sorted(by_comp.keys(), key=lambda i: (tier_order.get(companies[i]["tier"], 3), i))
for pass_no in ([1, 2] if second else [1]):
    for cid in comp_ids:
        if len(todo) >= budget:
            break
        if pass_no == 2 and tier_order.get(companies[cid]["tier"], 3) > 1:
            continue
        already = set(selected.get(str(cid), []))
        if len(already) >= pass_no:
            continue
        cands = [c for c in by_comp[cid] if c["name"] not in already and c["first"] and c["last"]]
        # need either a searchResultId or a domain/company name for name-based lookup
        cands = [c for c in cands if c.get("searchResultId") or c["domain"]]
        if not cands:
            continue
        cands.sort(key=score)
        best = cands[0]
        if best["title_rank"] >= 5 and pass_no == 2:
            continue  # do not spend a second credit on an unknown-title person
        item = {"company_id": cid, "company": best["company"], "name": best["name"], "first": best["first"],
                "last": best["last"], "title": best["title"], "domain": best["domain"],
                "searchResultId": best.get("searchResultId") or "", "linkedin": best.get("linkedin") or ""}
        todo.append(item)
        selected.setdefault(str(cid), []).append(best["name"])

json.dump(todo, open(f"{BASE}/research/todo_round_{rnd}.json", "w"), indent=1)
json.dump(selected, open(sel_path, "w"), indent=1)
print(f"round {rnd}: {len(todo)} contacts selected ({sum(1 for t in todo if t['searchResultId'])} by searchResultId, "
      f"{sum(1 for t in todo if not t['searchResultId'])} by name+domain); companies covered so far: {len(selected)}")
