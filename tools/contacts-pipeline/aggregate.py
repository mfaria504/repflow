"""Aggregate discovery agent output (out/batch_*.json) + companies.json into
contacts_raw.json and companies_enriched.json, and print coverage stats."""
import glob
import json
import re
from collections import defaultdict

from emailpat import split_name, norm

BASE = "/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad"

companies = {c["id"]: c for c in json.load(open(f"{BASE}/companies.json"))}

found = {}
for fn in sorted(glob.glob(f"{BASE}/out/batch_*.json")):
    try:
        arr = json.load(open(fn))
    except Exception as e:
        print("BAD JSON", fn, e)
        continue
    if isinstance(arr, dict):
        arr = [arr]
    for rec in arr:
        cid = rec.get("id")
        if cid in companies:
            found[cid] = rec


def clean_domain(d):
    d = (d or "").strip().lower()
    d = re.sub(r"^https?://", "", d)
    d = re.sub(r"^www\.", "", d)
    return d.split("/")[0]


def clean_li(u):
    u = (u or "").strip()
    if not u:
        return ""
    u = re.sub(r"\?.*$", "", u)
    u = u.replace("http://", "https://")
    if u.startswith("linkedin.com") or u.startswith("www.linkedin.com"):
        u = "https://" + u
    u = u.replace("https://linkedin.com", "https://www.linkedin.com")
    return u.rstrip("/")


TITLE_RANK = [
    (r"\b(owner|founder|co-?founder|president|ceo|chief executive|principal|partner|managing (director|partner|member))\b", 0),
    (r"\b(vice president|vp|v\.p\.|executive vice|coo|cfo|general manager|gm|chief)\b", 1),
    (r"\b(director|sales manager|regional manager|branch manager|manager of sales|national sales|head of)\b", 2),
    (r"\b(territory|outside sales|sales rep|account manager|account executive|business development|specification|spec sales|sales engineer|regional sales|inside sales manager)\b", 3),
    (r"\b(inside sales|customer service|quotation|estimat|project manager|marketing|operations|office manager|controller|accounting|admin|commissions)\b", 4),
]


def rank_title(t):
    t = (t or "").lower()
    if re.search(r"\b(retired|former|emeritus|past president|intern|student)\b", t):
        return 6
    for pat, r in TITLE_RANK:
        if re.search(pat, t):
            return r
    return 5


contacts = []
comp_out = []
for cid, c in companies.items():
    rec = found.get(cid)
    dom = clean_domain((rec or {}).get("domain") or c["website_domain"] or c["email_domain"])
    website = (rec or {}).get("website") or c["website"] or (f"https://{dom}" if dom else "")
    if website and not website.startswith("http"):
        website = "https://" + website
    comp = {
        "id": cid, "company": c["company"], "vertical": c["vertical"], "tier": c["tier"],
        "city": c["city"], "state": c["state"], "country": c["country"], "phone": c["phone"],
        "domain": dom, "website": website,
        "domain_source": (rec or {}).get("domain_source") or ("sheet" if c["website_domain"] else ("sheet-email" if c["email_domain"] else "none")),
        "domain_confidence": (rec or {}).get("domain_confidence") or ("high" if (c["website_domain"] or c["email_domain"]) else ""),
        "company_linkedin": (rec or {}).get("company_linkedin") or "",
        "seamless_employee_count": (rec or {}).get("seamless_employee_count") or "",
        "team_page_urls": (rec or {}).get("team_page_urls") or [],
        "notes": (rec or {}).get("notes") or "",
        "processed": rec is not None,
    }
    comp_out.append(comp)
    seen = {}
    people = list((rec or {}).get("contacts") or [])
    # always add the sheet contact
    if c["contact_name"].strip():
        raw = c["contact_name"].strip()
        parts = [p.strip() for p in raw.split(",")]
        nm = parts[0]
        ttl = ", ".join(p for p in parts[1:] if p and not re.fullmatch(r"(CPMR|CPSC|Jr\.?|Sr\.?|III|II|P\.?E\.?|MBA|CSP|CPA)", p))
        people.append({"name": nm, "title": ttl, "email": c["contact_email"], "sources": ["sheet"]})
    for p in people:
        name = (p.get("name") or "").strip()
        name = re.sub(r"\s*\[[^\]]*\]", "", name)  # drop bracketed notes like [surname not shown]
        name = re.sub(r"\s+", " ", name).strip()
        if not name or len(name.split()) < 2 and not p.get("linkedin"):
            continue
        first, last = split_name(name)
        key = norm(first)[:3] + "|" + norm(last)
        entry = {
            "company_id": cid, "company": c["company"], "domain": dom, "website": website,
            "name": name, "first": first, "last": last, "title": (p.get("title") or "").strip(),
            "linkedin": clean_li(p.get("linkedin")), "email": (p.get("email") or "").strip().lower(),
            "phone": (p.get("phone") or "").strip(), "city": p.get("city") or "", "state": p.get("state") or "",
            "seniority": p.get("seniority") or "", "department": p.get("department") or "",
            "searchResultId": p.get("searchResultId") or "", "sources": p.get("sources") or [],
        }
        if key in seen:
            e = seen[key]
            for f in ["title", "linkedin", "email", "phone", "city", "state", "seniority", "department", "searchResultId"]:
                if not e[f] and entry[f]:
                    e[f] = entry[f]
            e["sources"] = sorted(set(e["sources"]) | set(entry["sources"]))
        else:
            seen[key] = entry
    for e in seen.values():
        e["title_rank"] = rank_title(e["title"])
        contacts.append(e)

json.dump(contacts, open(f"{BASE}/contacts_raw.json", "w"), indent=1)
json.dump(comp_out, open(f"{BASE}/companies_enriched.json", "w"), indent=1)

n_proc = sum(1 for x in comp_out if x["processed"])
print(f"companies: {len(comp_out)} processed: {n_proc} with domain: {sum(1 for x in comp_out if x['domain'])}")
print(f"contacts: {len(contacts)} with linkedin: {sum(1 for x in contacts if x['linkedin'])} with email: {sum(1 for x in contacts if x['email'])} with title: {sum(1 for x in contacts if x['title'])}")
per = defaultdict(int)
for x in contacts:
    per[x["company_id"]] += 1
print("companies with >=1 contact:", len(per), " with >=3:", sum(1 for v in per.values() if v >= 3))
