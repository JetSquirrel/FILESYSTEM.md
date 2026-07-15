---
title: "FILESYSTEM.md: Agent-Native Filesystem Manifesto"
description: "Standardized, interoperable Agent-Native Filesystem (ANF) spec for humans and AI agents."
updatedDate: "15 Jul 2026"
source: "/filesystem.md"
---

# FILESYSTEM.md: A Manifesto for Agent-Native File Systems

**This document is for humans and AI agents.**  
It defines a standardized, interoperable, and secure Agent-Native Filesystem (ANF) specification. The filesystem is not merely storage — it is the primary interface between an agent, its memory, its identity, and its execution environment.

This document is both a declaration of philosophy and a practical operational standard. It is **harness-agnostic**: the same contract should work across Codex, Cursor, Claude Code, Copilot, and custom runtimes by mapping shared filesystem conventions to each tool's native instruction files.

---

## 1. Core Philosophy: The Filesystem is the Interface

For a large class of agentic systems, the filesystem is the most natural abstraction layer available.

Modern LLMs possess strong priors around:

- hierarchical directory traversal
- markdown documentation
- shell-like interaction models
- structured logging
- append-only workflows

Rather than building complex proprietary memory abstractions, ANF leverages:

- predictable directory structures
- explicit bootstrap files
- minimal context injection
- append-only logging
- deterministic loading rules

This reduces ambiguity, increases auditability, and improves interoperability across agent implementations.

### Key Principles

| Principle | Description | For Agents | For Humans |
|-----------|-------------|------------|------------|
| **Filesystem as API** | The directory tree is the primary interaction protocol. | I can reason via `ls`, `cat`, `grep`-like semantics. | The system is transparent and debuggable. |
| **Minimal Bootstrap Context** | Only essential files are injected at session start. | Conserves context window. | Predictable startup behavior. |
| **On-Demand Loading** | Large memory and skill definitions are loaded only when required. | Prevents token overload. | Scales cleanly with project size. |
| **Append-Only Logging** | Agent actions are recorded, never silently overwritten. | Enables recovery and traceability. | Provides audit trails. |
| **Security by Structure** | Clear boundaries for writable and readable paths. | Reduces unsafe execution risk. | Supports sandboxing and governance. |
| **Portable Behavior Contract** | Shared rules live in vendor-neutral files; tool-specific files are adapters. | One project works across many harnesses. | Avoids instruction drift between tools. |

---

## 2. Standardized Workspace Structure

The following root-level structure is the **recommended** ANF layout. Paths under `MEMORY/`, `SKILLS/`, `PROJECTS/`, and `LOGS/` are the durable capabilities of the standard. Identity overlays are optional and may be mapped to each harness's native files.

```text
/
├── FILESYSTEM.md        # This document (MUST)
├── AGENTS.md            # Shared operational rules (SHOULD; primary behavior file)
├── SOUL.md              # Agent identity / principles (OPTIONAL overlay)
├── USER.md              # User preferences / constraints (OPTIONAL overlay)
├── TOOLS.md             # Tool descriptions and usage guidance (SHOULD)
├── SECURITY.md          # Sandbox rules and permission constraints (SHOULD)
├── SKILLS/              # Reusable capabilities
│   └── [skill_name]/
│       └── SKILL.md
├── PROJECTS/            # Active workspaces
│   └── [project_name]/
├── MEMORY/              # Persistent storage
│   ├── daily/
│   │   └── YYYY-MM-DD.md
│   ├── observations/
│   └── learned/
└── LOGS/                # Append-only execution records
```

### File Requirements

| File | Requirement | Role |
|------|-------------|------|
| `FILESYSTEM.md` | **MUST** | Workspace contract: structure, bootstrap, loading rules |
| `AGENTS.md` | **SHOULD** | Shared agent operating rules (vendor-neutral) |
| `TOOLS.md` | **SHOULD** | Tool catalog without secrets |
| `SECURITY.md` | **SHOULD** | Path permissions, secret policy, escalation |
| `SOUL.md` | **OPTIONAL** | Stable identity / principles when useful |
| `USER.md` | **OPTIONAL** | Human preference overlay when useful |

### Harness Mapping (Adapters, Not Forks)

Keep one shared behavior source of truth. Bridge to tool-native files when needed:

| Shared (ANF) | Common harness adapters |
|--------------|-------------------------|
| `AGENTS.md` | Symlink or import into `CLAUDE.md`; Cursor may also use `.cursor/rules/` for scoped overrides |
| `SKILLS/*/SKILL.md` | Compatible with skill/pack formats that load on demand |
| `MEMORY/`, `LOGS/` | Runtime-owned persistence; not replaced by prompt files |

Tool-specific configs (permissions hooks, glob-scoped IDE rules, provider settings) may live beside ANF files. Do **not** duplicate the narrative contract across five markdown museums.

---

## 3. Context Injection: Deterministic Bootstrap

Agent initialization MUST follow this sequence:

### 3.1 Bootstrap Steps

1. **Read `FILESYSTEM.md`**  
   Understand workspace conventions and loading rules.
2. **Inject behavior / identity files that exist**  
   Prefer this order when present:
   - `AGENTS.md` (primary shared rules)
   - `SOUL.md` (optional identity)
   - `USER.md` (optional preferences)  
   If a harness only reads a native file (for example `CLAUDE.md`), inject that adapter **after** ensuring it points at the shared contract.
3. **Load recent memory** (when the memory layout exists)  
   Inject:
   - `MEMORY/daily/<today>.md`
   - `MEMORY/daily/<yesterday>.md` (if exists)
4. **Index skills and tools**  
   - List contents of `SKILLS/`
   - Load only summaries or first sections of each `SKILL.md`
   - Read `TOOLS.md` for tool reference (not secrets)

No other directories are loaded at bootstrap.

### 3.2 On-Demand Loading

Additional files are loaded only when required.

Examples:

- Skill definition: `SKILLS/web_research/SKILL.md`
- Historical memory: `MEMORY/learned/agent_memory_patterns.md`
- Project drafts: `PROJECTS/blog_post/draft.md`

Agents must explicitly request file loading.

---

## 4. Memory Model

Memory is structured into layers:

### 4.1 Daily Memory

Location:

```text
MEMORY/daily/YYYY-MM-DD.md
```

- Chronological log of session summaries.
- Automatically loaded for today and yesterday when present.

### 4.2 Observations

Location:

```text
MEMORY/observations/
```

- Raw external data.
- Append-only.
- Never edited after creation.

### 4.3 Learned Knowledge

Location:

```text
MEMORY/learned/
```

- Synthesized insights.
- May be updated with version control.
- Not auto-loaded.

---

## 5. Skills and Tools

### 5.1 Skills

Each skill resides in:

```text
SKILLS/[skill_name]/SKILL.md
```

A `SKILL.md` must define:

- Purpose
- Inputs
- Outputs
- Required permissions
- Example usage

Skills are loaded on demand.

### 5.2 Tools

`TOOLS.md` documents available tools.

It must include:

- Tool name
- Invocation pattern
- Constraints
- Safety considerations

It must NOT contain:

- API keys
- Secrets
- Credentials

---

## 6. Execution Model

Agents operate through a structured loop:

1. Orient (inspect filesystem)
2. Plan (define intended operations)
3. Execute (request loader actions)
4. Log (append execution results)

### 6.1 Separation of Planning vs Execution

Planning statements are internal reasoning.

Execution requests must be explicit and structured.

Example (conceptual):

```text
EXECUTE: write_file
PATH: PROJECTS/blog/draft.md
CONTENT: ...
```

All execution must be logged in `LOGS/`.

---

## 7. Security and Sandbox Rules

Security is structural.

### 7.1 Workspace Boundary

Agents may only read/write within workspace root.

Access outside workspace is prohibited unless explicitly authorized.

### 7.2 Secrets Handling

Secrets must:

- Not appear in injected markdown files
- Be stored outside injection scope
- Be accessed via controlled interfaces

### 7.3 Append-Only Logs

`LOGS/` must be append-only.  
No deletion or silent overwrites.

---

## 8. Versioning and Governance

Recommended practices:

- Place workspace under version control.
- Require human review for changes to:
  - `FILESYSTEM.md`
  - `AGENTS.md`
  - `SECURITY.md`
  - optional identity overlays (`SOUL.md`, `USER.md`) when used
- Keep harness adapters thin; prefer syncing from `AGENTS.md` rather than rewriting rules per tool.
- Segment large observation files.
- Archive old memory by date.

---

## 9. Example Workflow

**User Request:**  
"Research AI agent memory trends and write a blog post."

Agent workflow:

1. Inspect `PROJECTS/`
2. Create `PROJECTS/agent-memory-blog/`
3. Append research to:
   - `MEMORY/observations/YYYY-MM-DD_source.md`
4. Draft content in:
   - `PROJECTS/agent-memory-blog/draft.md`
5. Log execution in:
   - `LOGS/YYYY-MM-DD.log`

Filesystem remains the persistent state container.

---

## 10. Conclusion

The Agent-Native Filesystem is not a metaphor.

It is a concrete, structured runtime interface that:

- reduces abstraction layers
- improves interoperability across coding harnesses
- conserves context window
- enables auditability
- enforces security boundaries

By standardizing filesystem conventions — and treating vendor instruction files as adapters — we create deterministic agent environments that are portable across implementations.

The filesystem is not just storage.

It is the operating system of the agent.
