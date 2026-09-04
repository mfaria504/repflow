# Research (enrichment) agent instructions

Working directory: `/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad`

Goal: run Seamless.AI contact research on a fixed list of contacts and save the raw results to disk. Each researched contact costs 1 credit, so research ONLY the contacts in your todo file, each exactly once. Never add contacts, never use `skipDeduplicationCheck`.

## Tools
Load with one call: `ToolSearch query="select:mcp__Seamless__research_contacts,mcp__Seamless__poll_contact_research"`

## Procedure
1. Read your todo file `research/todo_round_N.json` (N given in your task). Each item has: company_id, company, name, first, last, domain, searchResultId (may be empty), linkedin.
2. Split the items into two groups: (A) items with a non-empty `searchResultId`; (B) items without one.
3. Group A: call `mcp__Seamless__research_contacts` with `searchResultIds` = up to 40 IDs per call and `waitForResults: true`.
   Group B: call `mcp__Seamless__research_contacts` with `contacts` = up to 40 objects per call, each `{ "contactName": "<name>", "companyName": "<company>", "domain": "<domain>" }` (Seamless requires companyName; include all three). If the item has a `linkedin` URL you may instead send `{ "liProfileUrl": "<url>" }`; if that comes back "error"/"not found", send the name+companyName+domain form once as a fallback (failed lookups do not consume credits), and `waitForResults: true`.
4. If the response says results are still pending, call `mcp__Seamless__poll_contact_research` with the returned `requestIds`, and repeat until every result has a terminal status (done, error, missing, not found). Wait about 20 seconds between polls (use `sleep 20` in Bash).
5. IMPORTANT: when a tool result is large, the harness saves it to a file instead of showing it, and tells you the file path (a `.txt` file under `tool-results/`, JSON inside). Do NOT try to read that file with the Read tool. Instead run a Python snippet that `json.load`s the file, pulls out the `results` array, and appends to your output file. When the result is shown inline, write it to disk with a Python heredoc immediately (do not retype it by hand; copy the JSON exactly).
6. Output file: `research/round_N.json` — a JSON array of objects `{ "company_id": ..., "name": ..., "status": "done|error|missing|not found", "contact": { ...the full contact object returned by Seamless... } }`. Map each result back to the todo item by `searchResultId` (group A) or by matching the returned `fullName`/`lIProfileUrl` to the item (group B). If a result cannot be mapped, keep it with `company_id: null` so nothing is lost.
7. After each call, immediately append to the output file. Keep going until every item in the todo file has been attempted once.
8. Do not call `research_contacts` again for items that already produced a result (even an error). Do not retry errors.

## Finish
Reply with exactly: round number, items attempted, results with status done, results with a non-empty email, results with a non-empty contactPhone1. Nothing else.
