# Courtney Site (Clean Restart)

This repo now runs as a single Netlify app:

- `Courtney's Frontend/` (website UI)
- `netlify/functions/chat.js` (backend API for Claude)

No Railway setup is required.

## Required Netlify environment variable

- `CLAUDE_API_KEY` = your real Claude API key
- Optional: `CLAUDE_MODEL` (defaults to `claude-3-5-sonnet-latest`)
