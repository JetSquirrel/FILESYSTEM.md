---
title: "Virtual Filesystem for Agents"
description: "Design a path-oriented virtual filesystem API that agents can navigate with list/read/write semantics."
updatedDate: "16 Jul 2026"
source: "/build/virtual-fs.md"
---

## Builder procedure

### Core idea

Expose a **single namespace of paths**. Agents should not need to know whether a path is a local file, a synthesized JSON view, or a remote object.

### Minimal API (MUST-level capabilities)

Implement at least:

```text
stat(path) -> { type: file|dir|missing, size?, mtime? }
list(path) -> entries[]
read(path) -> bytes|text
write(path, bytes|text, { mode: create|overwrite|append })
mkdir(path)
remove(path)   # optional; prefer policy-gated
```

Optional but valuable:

```text
grep(root, pattern) -> matches[]
watch(path) -> events   # for long-running agents
```

### Path rules (SHOULD)

- Use forward-slash logical paths (`/workspace/draft.md`)
- Normalize `.` / `..`; reject escapes outside the allowed root
- Keep paths stable across sessions when possible
- Document which prefixes are durable vs ephemeral

### Virtual files (MAY)

A path need not map 1:1 to disk:

| Logical path | Possible backing |
|---|---|
| `/memories/users/ada.json` | SQL row rendered as JSON |
| `/docs/policy.md` | Object store / DMS download |
| `/workspace/out.md` | Local sandbox file |
| `/proc/session.json` | Live runtime state |

The agent still uses `read` / `write`. The backend performs translation.

### Consistency model (SHOULD document)

Tell agents (in `FILESYSTEM.md` / `TOOLS.md`) what to expect:

- Read-after-write visibility
- Append vs overwrite semantics
- Whether deletes are allowed
- Whether directories are real or prefix illusions

### Checklist

- [ ] Path normalization + jail
- [ ] Explicit file/dir types
- [ ] Text/write/list work for UTF-8 markdown
- [ ] Append mode for logs
- [ ] Error strings that agents can parse (`not found`, `permission denied`)

## Human notes

Virtual FS is the hinge between **agent cognition** (paths) and **storage reality** (DB/S3/disk). Prefer a small, boring API over a clever one. See also [Composite backend](/build/composite/) and [Infrastructure mounts](/infra/mounts/).
