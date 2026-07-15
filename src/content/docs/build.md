---
title: "Build an Agent Filesystem"
description: "How to build a virtual filesystem, tool layer, sandbox, and composite backends for AI agents — complementary to the FILESYSTEM.md workspace contract."
updatedDate: "16 Jul 2026"
source: "/build.md"
---

## Builder procedure

Use this track when you are **implementing** filesystem capabilities for agents. The [For Agents](/for-agents/) handbook tells agents how to *use* a FILESYSTEM.md workspace; this track tells engineers how to *provide* the FS interface underneath.

### Read order

1. This hub (stack mental model)
2. [Virtual FS](/build/virtual-fs/) — path API as the agent-facing contract
3. [Tool layer](/build/tools/) — `list` / `read` / `write` / `grep` / `bash` bindings
4. [Sandbox](/build/sandbox/) — isolation, scopes, resets
5. [Composite backend](/build/composite/) — route `/docs`, `/memories`, `/workspace` to different stores

### Stack model

```text
┌─────────────────────────────────────────┐
│  FILESYSTEM.md workspace contract       │  ← what agents MUST follow
│  (bootstrap, MEMORY/, SKILLS/, LOGS/)   │
├─────────────────────────────────────────┤
│  Tool layer (list/read/write/grep/bash) │  ← what agents CALL
├─────────────────────────────────────────┤
│  Virtual FS API (path → bytes/meta)     │  ← stable interface
├─────────────────────────────────────────┤
│  Sandbox / permission boundary          │  ← safety envelope
├─────────────────────────────────────────┤
│  Backends: local | SQLite | S3 | Box…   │  ← interchangeable storage
└─────────────────────────────────────────┘
```

### Design goals (SHOULD)

- Preserve POSIX-like path semantics agents already know
- Keep the tool surface small and auditable
- Make backends swappable without rewriting agent prompts
- Enforce workspace boundaries in code, not only in markdown

### Manual index

| Doc | Focus |
|---|---|
| [Virtual FS](/build/virtual-fs/) | Interface contract, path ops, virtual files |
| [Tool layer](/build/tools/) | Agent-facing tools and schemas |
| [Sandbox](/build/sandbox/) | Isolation, network, path allowlists |
| [Composite backend](/build/composite/) | Prefix routing across stores |

## Human notes

FILESYSTEM.md does **not** require you to invent a new kernel filesystem. Most agent products expose a **virtual** filesystem (or sandbox mount) plus tools. Industry references: [Why Filesystems](/why-filesystems/), [Box composite FS](https://blog.box.com/filesystems-context-layer-ai-agents-powered-box), [Vercel filesystem agents](https://vercel.com/academy/filesystem-agents), [Amplify on FS for agents](https://www.amplifypartners.com/blog-posts/file-systems-for-agents).

For kernel/FUSE/cloud mounts, see the [Infrastructure](/infra/) track.
