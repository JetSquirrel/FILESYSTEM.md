---
title: "Linux VFS and FUSE for Agents"
description: "How Linux VFS concepts and FUSE user-space filesystems apply when building agent-visible mounts."
updatedDate: "16 Jul 2026"
source: "/infra/linux-fuse.md"
---

## Builder procedure

### Linux VFS (mental model)

The kernel **Virtual File System** is a common API in front of many concrete filesystems (ext4, NFS, tmpfs, FUSE, …). User processes issue POSIX calls (`open`, `read`, `write`, `readdir`); VFS dispatches to the mounted filesystem.

For agents, the important idea is the same as application virtual FS: **stable path semantics**, pluggable backing implementations.

### When to use FUSE

**FUSE** (Filesystem in Userspace) lets you implement FS operations in a user process and mount them into the Linux namespace.

Good fits:

- Presenting remote/API storage as paths
- Synthesizing virtual files from databases
- Per-agent mounts with custom policy
- Prototyping without writing kernel modules

Costs:

- Extra context switches vs in-kernel FS
- Operational complexity (mount permissions, reconnects)
- Need careful handling of concurrent small-file workloads

### Agent-oriented FUSE patterns

| Pattern | Description |
|---|---|
| Workspace mount | Mount a project tree into a sandbox at `/workspace` |
| Policy FS | Intercept writes to enforce allowlists / virus scan / redaction |
| Projection FS | Expose selected cloud folders as local paths |
| Overlay | Combine read-only base + writable upper layer |

### Implementation checklist

- [ ] Define supported ops (start with getattr/readdir/read/write)
- [ ] Jail logical roots even inside the mount
- [ ] Handle partial writes and append semantics for logs
- [ ] Decide cache/coherency story for multi-process agents
- [ ] Unmount/cleanup on sandbox teardown

### Relation to FILESYSTEM.md

FUSE can host the physical files behind `PROJECTS/`, `MEMORY/`, and `LOGS/`. Agents should still follow [For Agents](/for-agents/) procedures; they should not need to know the mount is FUSE.

## Human notes

FUSE is powerful but not mandatory. Many products never mount a custom FS and instead expose path tools over a virtual API ([Build → Virtual FS](/build/virtual-fs/)). Choose FUSE when you need real POSIX compatibility for existing binaries inside the sandbox.
