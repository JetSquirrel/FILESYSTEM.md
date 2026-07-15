---
title: "FILESYSTEM.md vs Other Standards"
description: "How FILESYSTEM.md compares to adjacent standards and protocols."
updatedDate: "15 Jul 2026"
source: "/compare.md"
---

This comparison clarifies scope and positioning, not competition. These layers are often complementary.

| Standard / Pattern | Primary Scope | Interface Layer | Transport / Runtime | Best Used For |
|---|---|---|---|---|
| **FILESYSTEM.md** | Workspace contract for agent memory, operations, and loading rules | Filesystem and markdown files | Any runtime that can read/write files | Deterministic multi-agent project structure |
| **AGENTS.md** | Shared agent instructions and behavior rules | Vendor-neutral markdown | Codex, Cursor, Copilot, Aider, and other readers | One portable operating contract across harnesses |
| **CLAUDE.md / `.cursor/rules/` / similar** | Harness-native instruction adapters | Tool-specific markdown / rules | Claude Code, Cursor, etc. | Thin bridges and scoped IDE overrides — not a second source of truth |
| **SOUL.md / USER.md** | Optional identity and preference overlays | Markdown files | Any prompt loader | Personalization when you want identity separate from ops rules |
| **MCP (Model Context Protocol)** | Tool and data connectivity protocol | Client-server protocol | MCP transports between model and tools | Standardized tool integration across apps |

## Practical Positioning

- Use **FILESYSTEM.md** to define project structure, bootstrap, memory, skills, and logs.
- Use **AGENTS.md** as the shared behavior contract.
- Use harness-native files only as **adapters** (symlink, `@import`, or short pointers).
- Use **SOUL.md / USER.md** optionally when identity overlays help.
- Use **MCP** to connect external tools and systems.

Together, these form a complete stack:

1. Filesystem contract (`FILESYSTEM.md`)
2. Shared behavior contract (`AGENTS.md` + thin harness adapters)
3. Optional identity overlays (`SOUL.md`, `USER.md`)
4. External capability transport (MCP)
