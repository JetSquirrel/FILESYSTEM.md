---
title: "Mountable Storage for Agent Workspaces"
description: "Patterns for mounting disk, NFS, bind mounts, and FS gateways into agent sandboxes."
updatedDate: "16 Jul 2026"
source: "/infra/mounts.md"
---

## Builder procedure

### Goal

Deliver a directory tree into the environment where agent tools run — safely and predictably.

### Common mount patterns

| Pattern | What it is | Agent use |
|---|---|---|
| Bind mount | Host dir → container path | Fast local workspace |
| Named volume | Orchestrator-managed volume | Durable per-project state |
| NFS / EFS mount | Network shared FS | Multi-host shared trees |
| FUSE mount | User FS gateway | API/DB projected as files |
| Object FS bridge | s3fs/gcsfuse-style | Convenience; mind latency |

### Suggested layout inside the sandbox

```text
/workspace/          # writable project root (FILESYSTEM.md lives here)
/workspace/PROJECTS/
/workspace/MEMORY/
/workspace/SKILLS/
/workspace/LOGS/
/mnt/docs/           # optional read-mostly shared docs
/mnt/cache/          # optional ephemeral cache
```

Keep secrets **off** these mounts (inject via runtime env/secret store).

### Mount policy (SHOULD)

- Read-only mounts for shared canonical docs when agents must not mutate them
- Writable mounts only for declared workspace prefixes
- Drop capabilities / use user namespaces in containers
- Remount/refresh strategy for long sessions

### Operational concerns

- **Startup time**: large network mounts can delay sandbox ready
- **Consistency**: NFS close-to-open vs local disk semantics
- **Cleanup**: unmount on teardown; avoid leaked FUSE processes
- **Observability**: log mount sources + options into session metadata (not into agent-visible secrets)

### Mapping to tracks

| Concern | See |
|---|---|
| Path API without real mounts | [Virtual FS](/build/virtual-fs/) |
| Prefix routing | [Composite backend](/build/composite/) |
| Isolation | [Sandbox](/build/sandbox/) |
| Kernel/user FS | [Linux FUSE](/infra/linux-fuse/) |
| Managed shared FS | [Cloud filesystems](/infra/cloud-fs/) |

## Human notes

Mounts are an implementation detail. Agents should keep using FILESYSTEM.md paths. If you change mount technology, update ops runbooks — not the agent-facing contract — whenever possible.
