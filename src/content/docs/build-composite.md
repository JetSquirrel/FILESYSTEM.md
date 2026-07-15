---
title: "Composite Filesystem Backends"
description: "Route different path prefixes to different storage backends while presenting one filesystem to the agent."
updatedDate: "16 Jul 2026"
source: "/build/composite.md"
---

## Builder procedure

### Goal

One agent-visible tree; many underlying stores.

```text
/docs/       → object store / DMS / Box / S3
/memories/   → SQLite or other DB synthesized as files
/workspace/  → local sandbox disk
/skills/     → package registry or repo SKILLS/
```

This matches the industry pattern described by [Box’s filesystem context layer](https://blog.box.com/filesystems-context-layer-ai-agents-powered-box) and similar Deep Agents composite backends.

### Router sketch

```text
resolve(path):
  if path.startswith("/docs/"):      return DocsBackend
  if path.startswith("/memories/"):  return MemoryBackend
  if path.startswith("/workspace/"): return LocalBackend
  return DefaultBackend
```

Each backend implements the same [Virtual FS](/build/virtual-fs/) API.

### Backend responsibilities

| Backend | Read | Write | Notes |
|---|---|---|---|
| Local | disk | disk | Lowest latency scratch |
| DB→files | render rows | controlled upsert | Great for structured memory |
| Object/DMS | download | versioned upload | Enterprise governance |
| Git repo | worktree | commit policy | Optional for code agents |

### Mapping to FILESYSTEM.md layouts

You MAY map standard directories onto prefixes:

| FILESYSTEM.md | Example prefix |
|---|---|
| `PROJECTS/` | `/workspace/PROJECTS/` |
| `MEMORY/` | `/memories/` or `/workspace/MEMORY/` |
| `SKILLS/` | `/workspace/SKILLS/` |
| `LOGS/` | `/workspace/LOGS/` (local, append-only) |

Keep the **logical** names stable in `FILESYSTEM.md` even if physical backends change.

### Consistency pitfalls

- Cross-backend transactions usually do not exist — avoid multi-prefix atomic writes
- Read-after-write may differ by backend latency
- Listing a composite root may require merging children

Document these limits for agents.

### Implementation checklist

- [ ] Shared path normalization before routing
- [ ] Per-backend auth (especially DMS/cloud)
- [ ] Versioned writes where the store supports it
- [ ] Clear error when a prefix is read-only
- [ ] Tests for prefix collisions (`/docs` vs `/docs-archive`)

## Human notes

Composite backends let you upgrade storage without rewriting agent procedures. Start with local-only; add `/docs` remote and `/memories` virtual files when needed. For mount-based approaches (FUSE/EFS), see [Infrastructure](/infra/).
