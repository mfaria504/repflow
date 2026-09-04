# RepFlow rep-agency contact database

The contact database built on top of the `hvac_manufacturers_reps_list` Google Sheet lives in that spreadsheet, in the
`Contacts` and `Companies (enriched)` tabs. It is intentionally not committed here: this repository is public and the
list contains direct phone numbers and email addresses for named individuals.

## Contacts tab columns

Company, First Name, Last Name, Job Title, Company URL, Email, Phone Number, LinkedIn, Email Status, Alt Email,
Phone Type, Priority, City, State, Company City, Company State, Vertical, Targeting Tier, Seniority, Department,
Data Sources, Company ID.

## Email Status

- `Verified (Seamless nn%)` - returned by Seamless.AI contact research with its confidence score. Alt Email holds Seamless's secondary candidates.
- `Listed (directory/website)` - printed on a public directory listing or the company website.
- `Inferred from company pattern (x)` - built from the person's name using the email format proven by a verified or listed email at the same domain (x is the pattern, e.g. `flast` = jsmith@).
- `Best guess (no pattern evidence)` - no proven format for that domain; uses the most common format in the dataset (first initial + last name). Alt Email holds the second most likely format.
- `Name incomplete` - only a first name or last initial was available, so no email was inferred.

## Phone Type

- `Direct (mobile/main)` - person-level number from Seamless.AI research.
- `Listed (directory/website)` - number printed next to the person on a listing or team page.
- `Company main` - company switchboard number from the directory listing.

## Priority

1 Owner/Principal/President, 2 VP/GM/C-suite, 3 Director/Sales Manager, 4 Outside/Territory Sales,
5 Inside Sales/Ops/Admin, 6 Title unknown, 7 Retired/Former.

## Caveats

Seamless.AI sometimes merges unrelated same-named firms under one record; obvious mismatches were discarded and
doubtful ones are flagged in the Notes column of the Companies tab. Inferred and best-guess emails are unverified:
run them through an email verifier before a large send. See `tools/contacts-pipeline/` for how the list was built.
