---
title: "Agent Operations"
description: "Orient, plan, execute, and log — the filesystem operation loop for FILESYSTEM.md agents."
updatedDate: "15 Jul 2026"
source: "/for-agents/operations.md"
---

## Agent procedure

Operate in a structured loop. Map these abstract ops to your harness tools (`bash`, `read_file`, `write_file`, `grep`, etc.).

### Loop

1. **Orient** — inspect the tree before writing
2. **Plan** — state intended paths and effects
3. **Execute** — perform explicit file ops
4. **Log** — append results to `LOGS/`

### Orient (MUST before large edits)

```text
list .
list PROJECTS/
list MEMORY/daily/
grep -r "<task keyword>" PROJECTS/ MEMORY/   # when searching
```

Prefer path-scoped searches over whole-disk scans.

If your harness is Claude Code–like, map these ops using [Claude Code mapping](/for-agents/claude-code/).

### Plan (SHOULD)

State:

- Target paths
- Whether you will create, append, or overwrite
- Which skill (if any) you will load
- What you will log

Do not treat planning prose as execution. Execution must be an explicit tool call.

### Execute (MUST be explicit)

Conceptual form:

```text
EXECUTE: write_file
PATH: PROJECTS/<name>/draft.md
CONTENT: ...
```

Rules:

- Prefer editing inside `PROJECTS/` for task artifacts
- Prefer append for logs and observations
- Do not silently overwrite append-only paths
- Re-read a file after risky edits when correctness matters

### Log (MUST)

```text
append_file LOGS/YYYY-MM-DD.log
# include: goal, paths touched, outcome, errors
```

If `LOGS/` is missing, create it before continuing durable work.

### Search patterns (SHOULD)

| Need | Prefer |
|---|---|
| Exact string / config value | `grep` / path read |
| “Something like X” | Optional vector index, then verify via file read |
| Prior decisions | `MEMORY/daily/`, then `MEMORY/learned/` |
| Reusable how-to | `SKILLS/<name>/SKILL.md` |

### Recovery (SHOULD)

On failure:

1. Re-read `FILESYSTEM.md` safety section if unsure about boundaries
2. Check `LOGS/` for the last successful step
3. Prefer append/fix over destroying prior artifacts

## Human notes

The loop makes agent work auditable. If an agent only “thinks” without logging, postmortems become guesswork.

**Anti-patterns**

- Editing production secrets or `.env` without an explicit allow policy
- Rewriting entire files when a small patch suffices
- Skipping orient and grepping the whole home directory
- Logging secrets into `LOGS/`
