# Discovery agent instructions (read fully before starting)

You are building a B2B prospect list of the people who work at independent manufacturers' representative agencies (HVAC, plumbing/PVF, electrical). Your job for each company in your batch: find its website domain, then find every person who works there with their job title and LinkedIn URL, and any email addresses or phone numbers that public sources list.

Working directory for all files: `/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad`

## Tools you may use

Load them first with ONE ToolSearch call:
`ToolSearch query="select:mcp__Seamless__search_companies,mcp__Seamless__search_contacts,WebSearch"`

- `mcp__Seamless__search_companies` (free, no credits) — finds the company record and its `domain`.
- `mcp__Seamless__search_contacts` (free, no credits) — lists employees for a `companyDomain` (name, title, liUrl, city, state, seniority, department, searchResultId).
- `WebSearch` (free) — finds websites, team pages, LinkedIn profiles.

Hard rules:
- NEVER call `mcp__Seamless__research_contacts`, `research_companies`, or anything that consumes credits. The lead agent does enrichment later.
- Do NOT use WebFetch or curl/python HTTP to company websites. The network egress proxy blocks them (you will get EGRESS_BLOCKED / 403). Do not retry them.
- Keep per-company tool usage bounded: at most 1 `search_companies`, at most 2 `search_contacts`, and at most 1 `WebSearch` call per company.
- WebSearch has a small shared budget for the whole session. Use it ONLY when Seamless did not give you a domain, or when Seamless returned fewer than 3 contacts for the company. If WebSearch ever returns a budget/quota error, stop calling it for the rest of the batch and continue with Seamless only; write "websearch_skipped" in that company's notes.

## Resuming a batch
If `out/batch_XX.json` already exists, load it first and SKIP every company whose `id` is already present in it (a previous agent finished those). Process only the remaining companies, appending to the same file. If the file exists but is not valid JSON, rename it to `out/batch_XX.broken.json` and start a fresh array.

## Per-company procedure

Input: `batches/batch_XX.json` — a list of company objects with fields: id, company, vertical, city, state, country, phone, website, website_domain, email_domain, contact_name, contact_email, description, lines, listing_urls, tier.

### Step 1 — Resolve the domain
1. If `website_domain` is set, use it (source "sheet"). If only `email_domain` is set, use it (source "sheet-email").
2. Else call `mcp__Seamless__search_companies` with `companyName: ["<company>"]`, `limit: 5`, and `companyState: ["<full state name>"]` when the state is known (convert the abbreviation, e.g. MD -> Maryland; for Canadian provinces use the province name, e.g. BC -> British Columbia). Accept a result only if the name clearly matches (same firm, ignoring Inc./LLC/Co./& vs and) AND the location is consistent with the sheet (same state, or the sheet has no state) AND the description/industry is plausible for a manufacturers' rep or wholesale-sales agency (construction, HVAC, plumbing, electrical, wholesale, building materials, industrial). Reject food brokers, car dealers, realtors, software companies, etc. Record the Seamless `domain`, `name`, `social.linkedin`, `employeeCount`, city/state (source "seamless").
3. If still no domain, `WebSearch` for `"<company name>" <city> <state>` (add `manufacturers representative` or `rep agency` if the name is generic). Pick the company's OWN website from the result links. Never accept these as the company site: supplyht.com, achrnews.com, hvacwebconnection.com, hvacnews.com, linkedin.com, facebook.com, instagram.com, yelp.com, zoominfo.com, dnb.com, crunchbase.com, manta.com, bbb.org, mapquest.com, chamberofcommerce.com, cmac.ws, yellowpages.com, bizapedia.com, opencorporates.com, indeed.com, glassdoor.com, electricalmarketing.com, cbinsights.com, rocketreach.co, apollo.io, signalhire.com, buzzfile.com, dandb.com, kompass.com, thomasnet.com, google.com, bing.com, wikipedia.org, nemra.org, aimr.net, mafsi.org, any state PHCC/ACCA chapter site, any manufacturer's "find a rep" page. Record source "websearch" and confidence "high" only if the site title/summary clearly is this firm at this location; otherwise "medium" or "low" with a note.
4. If no domain can be found, record `domain: ""` and continue with Step 2b.

### Step 2 — Find people
a. If you have a domain: `mcp__Seamless__search_contacts` with `companyDomain: ["<domain>"]`, `limit: 50`. Record EVERY result: name, title, liUrl, city, state, seniority, department, searchResultId, company (as Seamless names it). If `pagination.isMore` is true, call once more with the `nextToken` (max 2 calls). If the results' `company` field is obviously a different business that shares nothing with this firm, discard them and note it.
b. If no domain, or the domain search returned 0 results: `mcp__Seamless__search_contacts` with `companyName: ["<company>"]`, `companyNameSearchType: "exact"`, `limit: 50`, plus `contactState: ["<state>"]` when known. Keep only contacts whose `company` field clearly matches this firm.
c. Web (only if allowed by the budget rule above, max 1 call): if you have a domain, run `WebSearch` with `site:<domain> team OR staff OR "our team" OR "sales team" OR contact OR about`; if you have no domain, run `WebSearch` for `"<company name>" <city> <state> manufacturers representative` and use the result both to find the website (rules in Step 1.3) and to capture people. From the summary and links, capture person names with titles, emails, phone numbers, and LinkedIn URLs that belong to this firm, and record any team-page URL(s) you saw. Only record a person if the result text ties them to this firm.
d. Also glean the domain from Seamless contact records: every `search_contacts` result carries a `domain` field, so a by-name contact search can reveal the website when `search_companies` did not.
e. Always include the sheet's `contact_name` as a person (parse "David Jones, Owner" into name + title) with source "sheet" and the sheet's `contact_email` if present, unless the same person is already recorded (then merge: keep the email and LinkedIn).

Do not invent people. Do not include people from a different company. Do not guess emails (the lead agent does pattern inference later). If a directory or team page explicitly shows an email or phone for a person, record it verbatim.

### Step 3 — Write output progressively
Append each finished company to `out/batch_XX.json` (same XX as the batch) as a JSON array. Write with a short python snippet (read existing array if present, append, write back) so partial progress survives if you run out of context. Schema per company:

```json
{
  "id": 12,
  "company": "4 Leaf Sales Agency",
  "domain": "4leafsales.com",
  "website": "https://4leafsales.com",
  "domain_source": "sheet | sheet-email | seamless | websearch | none",
  "domain_confidence": "high | medium | low",
  "company_linkedin": "https://www.linkedin.com/company/...",
  "seamless_company_name": "4 Leaf Sales Agency",
  "seamless_employee_count": 6,
  "team_page_urls": ["https://4leafsales.com/team"],
  "contacts": [
    {
      "name": "David Jones",
      "title": "Owner",
      "linkedin": "https://www.linkedin.com/in/...",
      "email": "",
      "phone": "",
      "city": "Cockeysville",
      "state": "Maryland",
      "seniority": "C-Level",
      "department": "Sales",
      "searchResultId": "uuid-if-from-seamless",
      "sources": ["seamless", "sheet", "websearch:https://..."]
    }
  ],
  "notes": "anything odd: acquired by X, name mismatch, website dead, etc."
}
```

Merge duplicates within a company by name (case-insensitive; treat "Mike" and "Michael" as the same person if the last name matches and the title is the same). Keep the most complete record.

## When you finish the batch
Reply with exactly: the batch number, number of companies processed, number with a domain found, total contacts recorded, and any companies you could not resolve (one line each). Nothing else.
