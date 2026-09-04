"""Build the final clean contact list.

Inputs:  contacts_raw.json, companies_enriched.json, research/*.json (Seamless research results)
Outputs: final_contacts.csv / .xlsx, final_companies.csv
"""
import csv
import glob
import json
import re
from collections import Counter, defaultdict

from emailpat import detect, render, split_name, norm, NICKNAMES

BASE = "/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad"
contacts = json.load(open(f"{BASE}/contacts_raw.json"))
companies = {c["id"]: c for c in json.load(open(f"{BASE}/companies_enriched.json"))}
sheet = {c["id"]: c for c in json.load(open(f"{BASE}/companies.json"))}

# ---------- load Seamless research results ----------
research = {}  # key: (company_id, normalized name) -> result contact dict
for fn in glob.glob(f"{BASE}/research/round_*.json"):
    if not re.search(r"round_\d+\.json$", fn):
        continue
    data = json.load(open(fn))
    if not isinstance(data, list):
        continue
    for item in data:
        if not isinstance(item, dict):
            continue
        cid = item.get("company_id")
        try:
            cid = int(cid)
        except (TypeError, ValueError):
            cid = None
        ct = item.get("contact") or {}
        if item.get("status") != "done" or not ct:
            continue
        nm = norm(ct.get("firstName", ""))[:3] + "|" + norm(ct.get("lastName", ""))
        research[(cid, nm)] = ct

GENERIC = {"gmail.com", "yahoo.com", "aol.com", "hotmail.com", "outlook.com", "comcast.net", "att.net", "verizon.net",
           "sbcglobal.net", "bellsouth.net", "msn.com", "icloud.com", "me.com", "cox.net", "earthlink.net", "live.com"}


def fmt_phone(p):
    p = (p or "").strip()
    digits = re.sub(r"\D", "", p)
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    return p


# ---------- attach research to contacts ----------
for c in contacts:
    key = (c["company_id"], norm(c["first"])[:3] + "|" + norm(c["last"]))
    r = research.get(key)
    if not r:
        # try nickname-insensitive match on last name only within the company
        for (cid, nm), rr in research.items():
            if cid == c["company_id"] and nm.split("|")[1] == norm(c["last"]) and (
                NICKNAMES.get(norm(c["first"])) == norm(rr.get("firstName", "")) or NICKNAMES.get(norm(rr.get("firstName", ""))) == norm(c["first"])):
                r = rr
                break
    c["research"] = r


# ---------- per-domain email pattern ----------
evidence = defaultdict(Counter)  # domain -> Counter(pattern)
for c in contacts:
    dom = c["domain"]
    cands = []
    if c.get("research"):
        r = c["research"]
        e1 = (r.get("email") or r.get("email1") or "").lower()
        if e1:
            cands.append(e1)
    if c["email"]:
        cands.append(c["email"])
    for e in cands:
        ed = e.split("@")[-1]
        if ed != dom or ed in GENERIC:
            continue
        p = detect(e, c["first"], c["last"])
        if p:
            evidence[dom][p] += 2 if c.get("research") else 1

pattern_for = {d: cnt.most_common(1)[0][0] for d, cnt in evidence.items() if cnt}

# default guess when no evidence: based on overall distribution in this dataset
overall = Counter()
for d, cnt in evidence.items():
    overall[cnt.most_common(1)[0][0]] += 1
DEFAULT_PATTERN = overall.most_common(1)[0][0] if overall else "first"

# ---------- build final rows ----------
rows = []
for c in contacts:
    comp = companies[c["company_id"]]
    sh = sheet[c["company_id"]]
    r = c.get("research")
    email, estatus, alt = "", "", ""
    if r and (r.get("email") or r.get("email1")):
        email = (r.get("email") or r.get("email1")).lower()
        conf = r.get("email1TotalAI") or ""
        estatus = f"Verified (Seamless {conf})".replace(" )", ")")
        alts = [r.get("email2"), r.get("email3")]
        alt = "; ".join(a for a in alts if a)
    elif c["email"]:
        email = c["email"]
        estatus = "Listed (directory/website)"
    elif c["domain"] and c["first"] and len(norm(c["last"])) >= 2 and len(norm(c["first"])) >= 2:
        pat = pattern_for.get(c["domain"])
        if pat:
            email = render(pat, c["first"], c["last"]) + "@" + c["domain"]
            estatus = f"Inferred from company pattern ({pat})"
        else:
            email = render(DEFAULT_PATTERN, c["first"], c["last"]) + "@" + c["domain"]
            alt_p = "flast" if DEFAULT_PATTERN != "flast" else "first"
            a = render(alt_p, c["first"], c["last"])
            alt = (a + "@" + c["domain"]) if a else ""
            estatus = f"Best guess (no pattern evidence; {DEFAULT_PATTERN})"
        if email.startswith("@"):
            email, estatus = "", ""
    phone, pstatus = "", ""
    if r:
        for k in ["contactPhone1", "contactPhone2", "contactPhone3"]:
            if r.get(k):
                phone = fmt_phone(r[k])
                pstatus = f"Direct ({r.get(k + 'DataType', 'direct')})"
                break
        if not phone and r.get("companyPhone1"):
            phone, pstatus = fmt_phone(r["companyPhone1"]), "Company main (Seamless)"
    if not phone and c["phone"]:
        phone, pstatus = fmt_phone(c["phone"]), "Listed (directory/website)"
    if not phone and sh["phone"]:
        phone, pstatus = fmt_phone(sh["phone"]), "Company main (directory)"
    if not email and not estatus and c["domain"] and (len(norm(c["last"])) < 2 or len(norm(c["first"])) < 2):
        estatus = "Name incomplete (no email inferred)"
    title = c["title"] or (r or {}).get("title") or ""
    PRIO = {0: "1 - Owner/Principal/President", 1: "2 - VP/GM/C-suite", 2: "3 - Director/Sales Manager",
            3: "4 - Outside/Territory Sales", 4: "5 - Inside Sales/Ops/Admin", 5: "6 - Title unknown", 6: "7 - Retired/Former"}
    prio = PRIO.get(c.get("title_rank", 5), "6 - Title unknown")
    li = c["linkedin"] or (r or {}).get("lIProfileUrl") or ""
    src = ", ".join(sorted(set(s.split(":")[0] for s in c["sources"])))
    rows.append({
        "Company": c["company"], "First Name": c["first"], "Last Name": c["last"], "Job Title": title,
        "Company URL": comp["website"], "Email": email, "Phone Number": phone, "LinkedIn": li,
        "Email Status": estatus, "Alt Email": alt, "Phone Type": pstatus, "Priority": prio,
        "City": c["city"] or (r or {}).get("city") or "", "State": c["state"] or (r or {}).get("state") or "",
        "Company City": sh["city"], "Company State": sh["state"], "Vertical": comp["vertical"], "Targeting Tier": comp["tier"],
        "Seniority": c["seniority"] or (r or {}).get("seniority") or "", "Department": c["department"] or (r or {}).get("department") or "",
        "Data Sources": src, "Company ID": c["company_id"],
    })

# order: by company, then decision-makers first
rows.sort(key=lambda x: (x["Company"].lower(), x["Priority"], x["Last Name"].lower(), x["First Name"].lower()))
cols = ["Company", "First Name", "Last Name", "Job Title", "Company URL", "Email", "Phone Number", "LinkedIn",
        "Email Status", "Alt Email", "Phone Type", "Priority", "City", "State", "Company City", "Company State", "Vertical",
        "Targeting Tier", "Seniority", "Department", "Data Sources", "Company ID"]
with open(f"{BASE}/final_contacts.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    w.writerows(rows)

comp_rows = []
for cid, comp in companies.items():
    sh = sheet[cid]
    n = sum(1 for r_ in rows if r_["Company ID"] == cid)
    comp_rows.append({
        "Company": comp["company"], "Company URL": comp["website"], "Domain": comp["domain"],
        "Domain Source": comp["domain_source"], "Domain Confidence": comp["domain_confidence"],
        "Company LinkedIn": comp["company_linkedin"], "Main Phone": fmt_phone(sh["phone"]),
        "City": sh["city"], "State": sh["state"], "Country": sh["country"], "Vertical": comp["vertical"], "Targeting Tier": comp["tier"],
        "Email Pattern": pattern_for.get(comp["domain"], ""), "Seamless Headcount": comp["seamless_employee_count"],
        "Contacts Found": n, "Team Page URLs": "; ".join(comp["team_page_urls"]), "Notes": comp["notes"], "Company ID": cid,
    })
ccols = list(comp_rows[0].keys())
with open(f"{BASE}/final_companies.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=ccols)
    w.writeheader()
    w.writerows(comp_rows)

print("rows:", len(rows))
print("email status:", Counter(r_["Email Status"].split(" (")[0] for r_ in rows))
print("phone type:", Counter(r_["Phone Type"].split(" (")[0] for r_ in rows))
print("linkedin:", sum(1 for r_ in rows if r_["LinkedIn"]), " titles:", sum(1 for r_ in rows if r_["Job Title"]))
print("pattern evidence domains:", len(pattern_for), " default pattern:", DEFAULT_PATTERN, overall.most_common(6))
print("companies with 0 contacts:", sum(1 for x in comp_rows if x["Contacts Found"] == 0))
