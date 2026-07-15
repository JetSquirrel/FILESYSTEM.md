---
title: "Filesystem Infrastructure"
description: "Survey of Linux VFS/FUSE, cloud filesystems (EFS and friends), and mountable storage patterns relevant to agent workloads."
updatedDate: "16 Jul 2026"
source: "/infra.md"
---

## Builder procedure

Use this track when you need **OS- or cloud-level** filesystem primitives under an agent stack. It complements [Build an Agent Filesystem](/build/) (application virtual FS) and [For Agents](/for-agents/) (workspace procedures).

### Read order

1. This hub — choose the right layer
2. [Linux VFS & FUSE](/infra/linux-fuse/) — in-process/user mounts
3. [Cloud filesystems](/infra/cloud-fs/) — EFS and managed shared FS
4. [Mountable storage](/infra/mounts/) — bind mounts, NFS, object-via-FS bridges

### Which layer do you need?

| Need | Prefer | Track |
|---|---|---|
| Path API inside one agent process | Virtual FS + tools | [Build](/build/) |
| Same files across many sandboxes/hosts | Shared network/cloud FS | This track |
| Custom FS behavior without kernel modules | FUSE / user FS | [Linux FUSE](/infra/linux-fuse/) |
| Enterprise governance on “files” | DMS/object behind composite FS | [Composite](/build/composite/) + cloud |

### Agent workload reminders

From industry analyses ([Amplify](https://www.amplifypartners.com/blog-posts/file-systems-for-agents)): agents often want **many small files**, **frequent updates**, **hierarchical navigation**, and **low-latency loops**. Classic big-data FS and cold object stores may be a poor *primary* interface even if they are excellent durable backends.

### Manual index

| Doc | Focus |
|---|---|
| [Linux VFS & FUSE](/infra/linux-fuse/) | Kernel VFS concepts, FUSE for custom agent mounts |
| [Cloud filesystems](/infra/cloud-fs/) | EFS-like shared FS, tradeoffs vs object storage |
| [Mountable storage](/infra/mounts/) | How to mount and expose storage to sandboxes |

## Human notes

Infrastructure choices calcify. Start with local/sandbox disk for a single agent; introduce shared mounts only when multi-host concurrency or durable shared artifacts require them. Always keep FILESYSTEM.md’s logical layout stable above the mount.
