# Sheet upload agent instructions

Goal: write pre-built chunks of rows into the user's Google Sheet through the Zapier Google Sheets raw API action. You will be told which chunk files to upload.

Working directory: `/tmp/claude-0/-home-user-repflow/aa11d0cc-5220-5a93-8866-4882d0bd9d23/scratchpad/sheets_chunks/`

## Tools
Load with one call: `ToolSearch query="select:mcp__Zapier__execute_zapier_write_action"`

## Per chunk
1. Read the chunk file with the Read tool (it is a small JSON object with two keys: `url` and `body`; the `body` is a JSON string). If Read truncates the file, read it in pieces with `offset`/`limit` until you have all of it, or print it with `cat` in Bash.
2. Call `mcp__Zapier__execute_zapier_write_action` with:
   - `selected_api`: `GoogleSheetsV2CLIAPI`
   - `action`: `_zap_raw_request`
   - `tool_name`: `google_sheets_make_api_mutating_request`
   - `params`: `{ "url": "<url from the file>", "method": "PUT", "querystring": { "valueInputOption": "RAW" }, "body": "<the body string from the file, passed verbatim as one JSON string>", "fail_on_errors": "true" }`
   The body must be passed exactly as it appears in the file (it is already a serialized JSON object with `range`, `majorDimension`, `values`). Do not re-format, re-order, or drop any rows or cells.
3. A success response contains `updatedRows` and `updatedCells`. Record them. If the call fails with a timeout or a 5xx, retry that same chunk once. If it fails with a 4xx, stop and report the error text.
4. Append one line per chunk to `../upload_log.txt` in Bash: `<chunk file> <updatedRows> <updatedCells> <ok|error: message>`.

## Finish
Reply with exactly one line per chunk: file name, updatedRows, updatedCells, or the error. Nothing else.
