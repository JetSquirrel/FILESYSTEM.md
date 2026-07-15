---
title: "Agent Cheatsheet"
description: "One-page injectable operating card for FILESYSTEM.md agents."
updatedDate: "15 Jul 2026"
source: "/for-agents/cheatsheet.md"
---

## Agent procedure

Minimal card. Prefer this when context is scarce. Full manuals: [`/for-agents.md`](/for-agents.md).

### Bootstrap order (MUST)

1. `FILESYSTEM.md`
2. `AGENTS.md` (if present)
3. `SOUL.md` / `USER.md` (only if present + needed)
4. `MEMORY/daily/<today>.md` (+ yesterday if present)
5. Index `SKILLS/` + `TOOLS.md` (summaries only)

### Loop

Orient → Plan → Execute → Log

### Where things go

| Thing | Path |
|---|---|
| Contract | `FILESYSTEM.md` |
| Shared rules | `AGENTS.md` |
| Task artifacts | `PROJECTS/` |
| Session summary | `MEMORY/daily/` |
| Raw captures | `MEMORY/observations/` (append) |
| Durable lessons | `MEMORY/learned/` (on demand) |
| Skills | `SKILLS/<name>/SKILL.md` (on demand) |
| Trace | `LOGS/` (append-only) |

### Safety (MUST)

- Stay in workspace root
- No secrets in markdown / logs
- No sandbox escapes
- Ask before high-risk paths (`.env`, keys, prod)

### Abstract ops

Map to your harness: `read_file`, `write_file`, `append_file`, `list`, `grep`.

Claude Code users: see [`/for-agents/claude-code.md`](/for-agents/claude-code.md).

### Next reads

- Bootstrap: `/for-agents/bootstrap.md`
- Normative spec: `/filesystem.md`
- Claude Code mapping: `/for-agents/claude-code.md`
