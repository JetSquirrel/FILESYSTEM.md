---
title: "Agent Bootstrap"
description: "Deterministic session bootstrap for FILESYSTEM.md workspaces — what to inject, in what order, and what to defer."
updatedDate: "15 Jul 2026"
source: "/for-agents/bootstrap.md"
---

## Agent procedure

Session initialization **MUST** follow this order. Skip missing optional files; do not invent replacements mid-bootstrap.

### 1. Read the workspace contract

```text
read_file FILESYSTEM.md
```

Understand structure, loading rules, and safety boundaries before any writes.

### 2. Inject shared behavior

```text
read_file AGENTS.md          # SHOULD exist
```

If the harness only auto-loads a native file (for example `CLAUDE.md`), ensure that adapter points at `AGENTS.md`. Do not maintain divergent rule copies.

### 3. Inject optional identity overlays (MAY)

```text
read_file SOUL.md            # OPTIONAL
read_file USER.md            # OPTIONAL
```

Load only if present and relevant to the task.

### 4. Load recent daily memory (SHOULD)

```text
read_file MEMORY/daily/<today>.md
read_file MEMORY/daily/<yesterday>.md   # if exists
```

Do not auto-load `MEMORY/observations/` or `MEMORY/learned/` at bootstrap.

### 5. Index skills and tools (SHOULD)

```text
list SKILLS/
# For each skill: read only title/summary/first section of SKILL.md
read_file TOOLS.md           # reference only; never secrets
```

Full skill bodies load on demand — see [Skills](/for-agents/skills/).

### 6. Stop

No other directories are loaded at bootstrap unless the user explicitly requests them.

### Bootstrap checklist

| Step | Path | Requirement |
|---|---|---|
| Contract | `FILESYSTEM.md` | MUST |
| Behavior | `AGENTS.md` | SHOULD |
| Identity | `SOUL.md`, `USER.md` | OPTIONAL |
| Memory | `MEMORY/daily/<today\|yesterday>.md` | SHOULD if layout exists |
| Skills index | `SKILLS/` | SHOULD |
| Tools catalog | `TOOLS.md` | SHOULD |

## Human notes

Bootstrap exists to conserve context and make startups reproducible across Codex, Cursor, Claude Code, and custom runtimes.

**Anti-patterns**

- Dumping the whole monorepo into the first prompt
- Loading every `SKILL.md` “just in case”
- Putting API keys in `TOOLS.md` or identity files
- Skipping `FILESYSTEM.md` because “the agent already knows the repo”

**Harness tip:** keep narrative rules in `AGENTS.md`; symlink or `@import` into harness-native files.
