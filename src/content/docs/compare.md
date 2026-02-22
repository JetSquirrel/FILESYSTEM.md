---
title: "FILESYSTEM.md vs Other Standards"
description: "How FILESYSTEM.md compares to adjacent standards and protocols."
source: "/compare.md"
---

This comparison clarifies scope and positioning, not competition. These standards are often complementary.

| Standard | Primary Scope | Interface Layer | Transport / Runtime | Best Used For |
|---|---|---|---|---|
| **FILESYSTEM.md** | Workspace contract for agent memory, identity, and operations | Filesystem and markdown files | Any runtime that can read/write files | Deterministic multi-agent project structure |
| **AGENTS.md** | Agent instructions and behavior rules | Markdown instructions | Agent/session prompt loading | Defining agent-specific operating rules |
| **SOUL.md / USER.md** | Identity and user preference overlays | Markdown files | Agent/session prompt loading | Personalization, style, ethics, constraints |
| **MCP (Model Context Protocol)** | Tool and data connectivity protocol | Client-server protocol | MCP transports between model and tools | Standardized tool integration across apps |

## Practical Positioning

- Use **FILESYSTEM.md** to define project structure and loading behavior.
- Use **AGENTS.md**, **SOUL.md**, and **USER.md** to define behavior and identity.
- Use **MCP** to connect external tools and systems.

Together, these form a complete stack:

1. Filesystem contract (`FILESYSTEM.md`)
2. Behavior contract (`AGENTS.md`, `SOUL.md`, `USER.md`)
3. External capability transport (MCP)

