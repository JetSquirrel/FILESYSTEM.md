---
title: "Filesystem agent showcase"
description: "Projects that lean on the filesystem paradigm to organize agent context, skills, and backends."
source: "/showcase.md"
---

## OpenViking

- ByteDance open-source context OS for agents.
- Filesystem-first memory: contexts live as files, not loose text chunks.
- Layered loading trims tokens; memories can self-iterate; retrieval is fully traceable.
- Link: https://github.com/volcengine/OpenViking

## AGFS (Agent FS)

- Aggregated File System—unifies queues, DBs, object storage, and KV as file paths.
- Examples: `echo "value" > /kvfs/keys/mykey`, `echo "msg" > /queuefs/q/enqueue`, `cp file /s3fs/bucket/key`.
- Benefits: agents reuse native file ops, one interface for many backends, easy piping and debugging.
- Link: https://github.com/c4pt0r/agfs

## FUSE is All You Need

- Jakob Emmerling (2026-01-11) on exposing domains as files via FUSE.
- Notes recent agent harnesses (Turso AgentFS, Anthropic Agent SDK, Vercel) built on shell+FS.
- Shows long-context handling, scratch space, and progressive disclosure by mounting data (e.g., email) as directories.
- Takeaway: “everything as files” gives agents a single, calm UI layer.
- Link: https://jakobemmerling.de/posts/fuse-is-all-you-need/
