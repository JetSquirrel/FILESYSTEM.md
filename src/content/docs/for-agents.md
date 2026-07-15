---
title: "For Agents"
description: "Operating manual for coding agents using FILESYSTEM.md workspaces — what to read, in what order, and how humans should maintain it."
updatedDate: "15 Jul 2026"
source: "/for-agents.md"
---

## Agent procedure

1. If context is tight, fetch and follow [`/for-agents/cheatsheet.md`](/for-agents/cheatsheet.md) first.
2. Otherwise read this hub, then in order:
   1. [`/for-agents/bootstrap.md`](/for-agents/bootstrap.md)
   2. [`/for-agents/operations.md`](/for-agents/operations.md)
   3. [`/for-agents/memory.md`](/for-agents/memory.md)
   4. [`/for-agents/skills.md`](/for-agents/skills.md)
   5. [`/for-agents/safety.md`](/for-agents/safety.md)
3. Treat [`/filesystem.md`](/filesystem.md) as the normative workspace contract.
4. Map abstract ops (`read_file`, `grep`, `append_log`) to your harness tools. Do not invent a second layout.
5. Prefer on-demand reads. Do not load the entire repo into context at bootstrap.

### Recommended session start

```text
1. read_file FILESYSTEM.md
2. read_file AGENTS.md          # if present
3. read_file SOUL.md / USER.md  # only if present and needed
4. read_file MEMORY/daily/<today>.md
5. list SKILLS/                 # index only; do not load full SKILL.md yet
```

### Manual index

| Doc | When to use |
|---|---|
| [Cheatsheet](/for-agents/cheatsheet/) | Minimal injectable card |
| [Bootstrap](/for-agents/bootstrap/) | Session start / cold start |
| [Operations](/for-agents/operations/) | Orient → plan → execute → log |
| [Memory](/for-agents/memory/) | Daily / observations / learned |
| [Skills](/for-agents/skills/) | Loading reusable capabilities |
| [Safety](/for-agents/safety/) | Boundaries, secrets, append-only logs |
| [Claude Code mapping](/for-agents/claude-code/) | Map abstract ops to Claude Code–style tools + study guide |

## Human notes

This section is the **agent-facing handbook** for FILESYSTEM.md. Humans maintain the workspace; agents execute against it.

- Put durable rules in `FILESYSTEM.md` + `AGENTS.md`, not in chat history.
- Keep harness-specific files (`CLAUDE.md`, `.cursor/rules/`) as thin adapters.
- For Claude Code internals and engineering patterns, see [Claude Code mapping](/for-agents/claude-code/) and the public study guide: [jetsquirrel.github.io/claude-code-study](https://jetsquirrel.github.io/claude-code-study/).
- To **build** runtimes (virtual FS, tools, sandbox, composite backends), see [Build](/build/).
- For Linux/FUSE/cloud mounts, see [Infrastructure](/infra/).

### Out of scope

- Bypassing sandboxes or secret stores
- Reverse-engineering proprietary agent binaries or leaked source
- Replacing MCP, vector indexes, or enterprise DMS permissions
