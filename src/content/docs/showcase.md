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

## AGFS (Agent FS)

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

## FUSE is All You Need

**Giving agents access to anything via filesystems**

Jakob Emmerling (2026-01-11) on exposing domains as files via FUSE.

- Notes recent agent harnesses (Turso AgentFS, Anthropic Agent SDK, Vercel) built on shell+FS
- Shows long-context handling, scratch space, and progressive disclosure by mounting data (e.g., email) as directories
- Example: email as directories/files so agents use `ls`, `cat`, `mv`

**Takeaway:** "everything as files" gives agents a single, calm UI layer.

[Read article →](https://jakobemmerling.de/posts/fuse-is-all-you-need/)
