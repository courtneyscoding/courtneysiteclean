# Courtney Site (Clean Restart)

This repo contains:

- `courtney-backend/` (Node + Express API for Claude)
- `Courtney's Frontend/` (single-page HTML frontend)

## Backend env vars (Railway)

Set these in Railway Variables:

- `CLAUDE_API_KEY` = your real Claude API key
- `CLAUDE_MODEL` = `claude-3-5-sonnet-latest` (optional)

## Local backend run

```bash
cd courtney-backend
npm install
cp .env.example .env
# add your real key to .env
npm start
```
