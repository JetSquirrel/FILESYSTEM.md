---
title: "The industry is converging on filesystems for agents"
description: "Notes on Amplify, Vercel Academy, and Box — and how FILESYSTEM.md sits as the workspace contract on top of filesystem-first agents."
publishDate: "15 Jul 2026"
updatedDate: "15 Jul 2026"
tags: ["filesystem", "agents", "geo", "landscape"]
pinned: false
---

If you search for “filesystem agents” in 2026, you will find more than blog posts about coding assistants. You will find **infrastructure theses**, **hands-on courses**, and **enterprise context layers** all pointing at the same abstraction: give agents a navigable filesystem.

Three pieces are especially useful right now:

1. [Amplify Partners — File systems for agents](https://www.amplifypartners.com/blog-posts/file-systems-for-agents)  
   Why agents prefer FS-like interfaces over OLTP databases and object stores as the *primary* way they touch data — and why today’s POSIX stacks may still need to evolve for agent-scale concurrency.

2. [Vercel Academy — Building Filesystem Agents](https://vercel.com/academy/filesystem-agents)  
   A practical course: structure domain data as files, give the agent bash in a sandbox, keep context minimal and debuggable.

3. [Box — Filesystems as the context layer](https://blog.box.com/filesystems-context-layer-ai-agents-powered-box)  
   The important production twist: a filesystem is an **interface contract**. Backends can be Box, SQLite-generated virtual files, or local disk — the agent still just `ls` / `read` / `write`.

## Where FILESYSTEM.md fits

Those articles mostly answer: *why filesystems?* and *how do I run an agent against files?*

FILESYSTEM.md answers a different question: **inside a project workspace, what should every agent be able to find?**

- Deterministic bootstrap
- Shared behavior via `AGENTS.md` (with thin harness adapters)
- Layered memory, skills, and append-only logs
- Portable rules across Codex, Cursor, Claude Code, and friends

In other words:

| Layer | Examples |
|---|---|
| Storage / backend FS | Local disk, Vercel Sandbox, Box, composite Deep Agents backends |
| Agent tools | bash, read_file, write_file, grep |
| Workspace contract | **FILESYSTEM.md** + AGENTS.md |

We wrote a longer orientation page that cites these sources and maps the stack:

→ **[Why Filesystems for Agents](/why-filesystems/)**

If you only have five minutes: read that page, then the [Manifesto](/posts/filesystem-manifesto/), then [Getting Started](/getting-started/).

The curated list (including Amplify / Vercel Academy / Box) lives on the [Reading List](/readinglist/).
