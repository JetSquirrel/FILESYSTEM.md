---
title: "Agent Filesystem Tool Layer"
description: "Bind virtual filesystem operations to agent tools — schemas, concurrency, and mapping to FILESYSTEM.md abstract ops."
updatedDate: "16 Jul 2026"
source: "/build/tools.md"
---

## Builder procedure

### Purpose

Agents do not call your storage SDK. They call **tools**. The tool layer is the public ABI.

### Recommended tool set

| Tool | Maps to | Notes |
|---|---|---|
| `list` / `LS` | `list(path)` | Return names + types |
| `read_file` | `read(path)` | Cap max bytes; support offset/limit if large |
| `write_file` | `write(..., overwrite)` | Prefer patches when available |
| `edit_file` | surgical update | Reduces rewrite risk |
| `append_file` | `write(..., append)` | For `LOGS/` and observations |
| `grep` / `search` | indexed or ripgrep | Exact match for configs |
| `bash` | shell in sandbox | Powerful; needs strict policy |

Keep names stable. Document them in `TOOLS.md` without secrets.

### Schema tips (SHOULD)

- Validate paths with a jail-aware normalizer before I/O
- Mark tools read-only vs destructive for permission engines
- Bound output size (`maxResultSizeChars`) so tool results cannot blow the context window
- Return structured errors agents can recover from

### Concurrency (SHOULD)

- Reads: usually concurrency-safe
- Writes to the same path: serialize or reject
- `bash`: treat as potentially destructive; gate with permissions

### Mapping to FILESYSTEM.md

| FILESYSTEM.md abstract op | Tool |
|---|---|
| Orient | `list`, `grep` |
| Execute write | `write_file` / `edit_file` |
| Memory append | `append_file` |
| Skill load | `read_file SKILLS/.../SKILL.md` |
| Log | `append_file LOGS/...` |

See [For Agents → Operations](/for-agents/operations/) and [Claude Code mapping](/for-agents/claude-code/).

### Anti-patterns

- One mega-`run_code` tool with no path policy
- Returning entire repos from a single `read`
- Silent overwrite of append-only logs
- Tool descriptions that contradict `FILESYSTEM.md`

## Human notes

Industrial harnesses (see the [Claude Code study](https://jetsquirrel.github.io/claude-code-study/) tool chapters) separate **tool type systems**, **permission checks**, and **UI/progress**. You do not need feature parity on day one — you need a safe, path-centric MVP.
