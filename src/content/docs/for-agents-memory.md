---
title: "Agent Memory"
description: "How agents should use MEMORY/daily, observations, and learned layers in a FILESYSTEM.md workspace."
updatedDate: "15 Jul 2026"
source: "/for-agents/memory.md"
---

## Agent procedure

Memory is layered. Load the smallest useful layer.

### Layout

```text
MEMORY/
├── daily/YYYY-MM-DD.md      # session summaries (auto-load today/yesterday)
├── observations/            # raw external notes (append-only)
└── learned/                 # synthesized durable insights (on demand)
```

### Daily memory (SHOULD)

At bootstrap, read today and yesterday if present.

During/after work:

```text
append_file MEMORY/daily/YYYY-MM-DD.md
# bullet summary: goals, decisions, open questions, paths touched
```

Keep daily notes short. Move durable conclusions to `learned/`.

### Observations (SHOULD for external inputs)

When capturing raw research, quotes, or tool dumps:

```text
append_file MEMORY/observations/YYYY-MM-DD_<topic>.md
```

Rules:

- Append-only — do not silently rewrite prior observations
- Keep provenance (URL, timestamp, why captured)
- Do not put secrets in observations

### Learned knowledge (MAY / on demand)

When a pattern will matter across sessions:

```text
read_file MEMORY/learned/<topic>.md    # before writing duplicates
write_file MEMORY/learned/<topic>.md   # synthesized, versioned insight
```

Do **not** auto-load `learned/` at bootstrap.

### What goes where

| Content | Destination |
|---|---|
| “What happened this session” | `MEMORY/daily/` |
| Raw excerpt / scrape / transcript snippet | `MEMORY/observations/` |
| Reusable lesson / convention | `MEMORY/learned/` |
| Task draft / deliverable | `PROJECTS/` |
| Execution trace | `LOGS/` |

### Retrieval order (SHOULD)

1. Today/yesterday daily
2. Relevant `PROJECTS/` files
3. `grep` observations
4. Specific `learned/` docs
5. Only then broaden search

## Human notes

Layering prevents context blow-ups and keeps audit trails.

**Anti-patterns**

- One giant `memory.md` that grows forever
- Editing observation files instead of appending
- Storing credentials in memory files
- Auto-injecting all of `learned/` every session
