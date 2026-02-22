---
title: "Filesystem agent showcase"
description: "Projects that lean on the filesystem paradigm to organize agent context, skills, and backends."
source: "/showcase.md"
---

## OpenViking

**ByteDance open-source context OS for agents**

Filesystem-first memory: contexts are files, not loose text chunks. Layered loading trims tokens while memories stay traceable.

- Unified place for skills, resources, and memory
- On-demand layers keep context lean
- Retrieval is visualized end-to-end

[View project →](https://github.com/volcengine/OpenViking)

---

## AGFS (Aggregated File System)

**Aggregated File System — Everything is a file, in RESTful APIs**

Unifies queues, databases, storage, and KV as file paths so agents just read and write.

**Examples:**

- `redis.set("key", "value")` → `echo "value" > /kvfs/keys/mykey`
- `sqs.send_message(queue, msg)` → `echo "msg" > /queuefs/q/enqueue`
- `s3.put_object(bucket, key, data)` → `cp file /s3fs/bucket/key`

**Benefits:**

- Native mental model for LLMs: ls, cat, echo
- Single interface reduces coordination overhead
- Pipes and redirects keep composition and debugging simple

[View project →](https://github.com/c4pt0r/agfs)

---

## AgentFS

**SQLite-backed filesystem purpose-built for agent state**

Stores every tool call and file operation in SQLite while exposing the filesystem over FUSE (Linux) or NFS (macOS), plus SDKs for TypeScript, Python, and Rust.

- Full audit log of agent behavior lives alongside files
- CLI and mounts let agents use `ls`, `cat`, and friends without extra plumbing
- Specs and SDKs keep storage layout consistent across runtimes

[View project →](https://github.com/tursodatabase/agentfs)

---

## VectorVFS

**Your Linux filesystem as a vector database**

Keeps embeddings in VFS extended attributes so files stay the source of truth—no separate index services.

- Embeddings stored as xattrs; moves and renames stay in sync
- Works with Meta Perception Encoders by default; pluggable models coming
- Search files by similarity using the existing directory layout

[View project →](https://github.com/perone/vectorvfs)

---

## FUSE is All You Need

**Giving agents access to anything via filesystems**

Jakob Emmerling (2026-01-11) on exposing domains as files via FUSE.

- Notes recent agent harnesses (Turso AgentFS, Anthropic Agent SDK, Vercel) built on shell+FS
- Shows long-context handling, scratch space, and progressive disclosure by mounting data (e.g., email) as directories
- Example: email as directories/files so agents use `ls`, `cat`, `mv`

**Takeaway:** "everything as files" gives agents a single, calm UI layer.

[Read article →](https://jakobemmerling.de/posts/fuse-is-all-you-need/)
