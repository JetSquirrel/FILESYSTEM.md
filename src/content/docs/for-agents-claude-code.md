---
title: "Claude Code Mapping"
description: "Map FILESYSTEM.md agent procedures to Claude Code–style tools and harness adapters, using the public Claude Code study guide as further reading."
updatedDate: "15 Jul 2026"
source: "/for-agents/claude-code.md"
---

## Agent procedure

Use this page when your harness is **Claude Code** (or a CLAUDE.md-based adapter). FILESYSTEM.md stays harness-agnostic; this page only maps abstractions.

### 1. Keep one behavior source

1. Put shared rules in `AGENTS.md`.
2. Keep `CLAUDE.md` as a thin adapter (`@AGENTS.md` import or symlink).
3. Do not fork the same rules into multiple files.

### 2. Map abstract ops to Claude Code–style tools

| FILESYSTEM.md abstract op | Typical Claude Code–style tool | Notes |
|---|---|---|
| `list` / tree orient | Bash (`ls`, `find`) or search/list helpers | Prefer workspace-scoped paths |
| `read_file` | FileRead | Read before large edits |
| `write_file` / patch | FileWrite / FileEdit | Prefer edit over full rewrite when possible |
| `grep` | ripgrep via Bash or dedicated search tool | Exact match before broad semantic search |
| `append_file` (logs/memory) | FileEdit / FileWrite append pattern | Never silently overwrite `LOGS/` |
| skill load | Skill / plugin load, then `read_file SKILLS/.../SKILL.md` | Index first; full body on demand |
| external tools | MCP-wrapped tools | Still respect workspace + secrets policy |

### 3. Session mapping

| FILESYSTEM.md step | Claude Code–oriented action |
|---|---|
| Bootstrap `FILESYSTEM.md` | Ensure it is readable in workspace; follow [Bootstrap](/for-agents/bootstrap/) |
| Inject `AGENTS.md` | Load via `CLAUDE.md` adapter if needed |
| Daily memory | Read/append `MEMORY/daily/YYYY-MM-DD.md` |
| Skills index | List `SKILLS/`; load one `SKILL.md` when required |
| Log | Append `LOGS/YYYY-MM-DD.log` |

### 4. Further reading (public study guide)

For architecture depth (tools, permissions, memory, skills, context), read the public study site:

- Hub: [深入 Claude Code：AI Agent 架构设计与工程实践](https://jetsquirrel.github.io/claude-code-study/)
- Especially relevant chapters: **工具系统**, **权限与安全模型**, **上下文窗口管理**, **记忆/持久化**, **Hooks / Skills / 插件**

Treat that site as **educational analysis**, not Anthropic official documentation. Prefer verifying behavior against your installed harness and this workspace contract.

## Human notes

**Why this page exists**

Humans often ask “how does a production coding agent touch the filesystem?” The study guide explains one industrial harness’s tool/permission/memory shape. FILESYSTEM.md standardizes the **workspace contract** those tools should honor.

**Complementary, not competing**

| Resource | Role |
|---|---|
| FILESYSTEM.md + [For Agents](/for-agents/) | Portable workspace procedures |
| [Claude Code study](https://jetsquirrel.github.io/claude-code-study/) | Harness internals & engineering patterns |
| Official Anthropic docs | Authoritative product behavior |

**Out of scope here**

- Reproducing or redistributing proprietary source trees
- Sandbox escapes or permission bypass recipes
- Claiming bit-exact parity with any private codebase
