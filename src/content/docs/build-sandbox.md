---
title: "Sandboxing Agent Filesystems"
description: "Isolate agent filesystem access with path jails, process sandboxes, network policy, and resettable workspaces."
updatedDate: "16 Jul 2026"
source: "/build/sandbox.md"
---

## Builder procedure

### Goal

Assume the model will try creative paths. Enforce boundaries in the **runtime**, not only in prompts.

### Layers of isolation

1. **Path jail** — all FS tools resolve under an allowed root
2. **Process sandbox** — bash/tools run in a container/VM/microVM/sandbox product
3. **Network policy** — default deny or allowlist
4. **Secret boundary** — credentials never mounted into agent-visible trees
5. **Resetability** — ephemeral workspaces can be wiped between tasks

### Path jail (MUST)

```text
root = /sandbox/workspace
input:  ../../etc/passwd  → reject
input:  /etc/passwd       → reject unless explicitly allowed
input:  PROJECTS/a.md     → /sandbox/workspace/PROJECTS/a.md
```

Implement once; call from every tool.

### Bash / shell (SHOULD)

If you expose `bash`:

- Run inside the sandbox FS root (chroot, container workdir, or vendor sandbox)
- Block privileged operations by default
- Log command + cwd + exit code to `LOGS/` (without secrets)
- Prefer dedicated `grep`/`read` tools for common cases to reduce shell use

### Ephemeral vs durable mounts (SHOULD)

| Mount | Lifetime | Examples |
|---|---|---|
| Ephemeral workspace | per task/session | scratch drafts |
| Durable project | per repo | `FILESYSTEM.md`, `AGENTS.md`, `PROJECTS/` |
| Durable memory | long-lived | `MEMORY/`, remote docs |

Document this split in `FILESYSTEM.md` so agents know what survives reset.

### Failure modes to test

- Symlink escape
- Absolute path injection
- Writing outside allowlist via bash redirection
- Huge file reads exhausting memory
- Parallel writers corrupting logs

### Checklist

- [ ] Jail shared by all tools
- [ ] Sandbox for shell
- [ ] No secrets in readable mounts
- [ ] Audit log of FS mutations
- [ ] Documented reset semantics

## Human notes

Sandboxing is where “filesystem for agents” becomes production-ready. Pair this page with [Agent Safety](/for-agents/safety/) (policy for agents) and [Infrastructure](/infra/) (OS/cloud primitives).
