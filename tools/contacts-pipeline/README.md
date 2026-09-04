# Contacts pipeline

Scripts and agent playbooks used to build the RepFlow rep-agency contact database. The data itself lives in the
`hvac_manufacturers_reps_list` Google Sheet (tabs `Contacts` and `Companies (enriched)`), not in this repo, because
the repo is public and the list contains people's direct phone numbers and emails.

- `AGENT_INSTRUCTIONS.md` - playbook for the discovery agents (domain resolution, Seamless.AI employee lookup, team-page search).
- `RESEARCH_INSTRUCTIONS.md` - playbook for the enrichment agents (Seamless.AI research for verified emails and direct phones).
- `aggregate.py` - merges agent output into one contact table and ranks titles.
- `select_research.py` - picks which decision-makers to spend research credits on.
- `emailpat.py` - email-format detection and rendering (first, flast, first.last, ...).
- `compile.py` - builds the final contact and company tables, applying verified, listed, inferred, or best-guess emails.
- `build_xlsx.py` - writes the workbook (original tabs + Contacts + Companies + README).

Paths inside the scripts point at the scratch directory of the session that produced the data; adjust `BASE` before re-running.
