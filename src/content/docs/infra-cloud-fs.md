---
title: "Cloud Filesystems for Agents"
description: "EFS and managed shared filesystems versus object storage — what fits agent read/write loops."
updatedDate: "16 Jul 2026"
source: "/infra/cloud-fs.md"
---

## Builder procedure

### Shared filesystem vs object store

| | Managed shared FS (e.g. AWS EFS, similar NFS-style services) | Object storage (S3/GCS/Azure Blob) |
|---|---|---|
| Interface | POSIX mount / NFS | HTTP object API (or FS gateway) |
| Best for | Shared directories, many small files, collaborative workspaces | Large durable blobs, checkpoints, media |
| Agent fit | Strong when agents need real paths + shared edits | Strong as durable backend behind a virtual FS |
| Watch-outs | Cost, throughput limits, lock/metadata contention | High latency for tiny read/write loops; immutable objects |

Amplify’s industry framing: object stores optimize for large durable objects; agents often invert that with **frequent small mutations**. Use object storage as a backend, not always as the agent’s primary interface.

### When EFS-like systems help

- Multiple sandboxes/hosts must see the same `PROJECTS/` tree
- You want standard tools (`rg`, editors, compilers) on a shared mount
- Team workflows need a familiar directory share

### When to avoid as the only layer

- Extreme create/delete churn of tiny files without caching
- Cross-region latency sensitive loops
- Workloads that are really “blob checkpointing”

### Recommended architectures

1. **Local scratch + cloud durable**  
   Agent writes hot state locally; sync/publish artifacts to EFS/object store.

2. **EFS for shared repos**  
   Mount repo + `MEMORY/` for multi-agent teams; keep secrets elsewhere.

3. **Object store behind composite FS**  
   `/docs` reads from objects; `/workspace` stays local ([Composite](/build/composite/)).

### Checklist

- [ ] Mount options documented (perf mode, throughput mode, encryption)
- [ ] POSIX permissions mapped to your auth model
- [ ] Backup/version story for agent-written trees
- [ ] Quotas to stop runaway agents filling the share
- [ ] Clear FILESYSTEM.md note on what is shared vs local

## Human notes

“Cloud filesystem” is not one product category. Decide whether you need **POSIX sharing** or **durable blobs**, then pick EFS-like vs object storage (or both). See [Mountable storage](/infra/mounts/).
