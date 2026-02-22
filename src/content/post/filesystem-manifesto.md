---
title: "FILESYSTEM.md: Agent-Native Filesystem Manifesto"
description: "Standardized, interoperable, and secure Agent-Native Filesystem (ANF) specification for humans and AI agents."
publishDate: "22 Feb 2026"
tags: ["filesystem", "agents", "manifesto", "spec"]
pinned: true
---

# FILESYSTEM.md: A Manifesto for Agent-Native File Systems

**This document is for humans and AI agents.**  
It defines a standardized, interoperable, and secure Agent-Native Filesystem (ANF) specification aligned with established workspace conventions.

This document is both a declaration of philosophy and a practical operational standard.

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

---

## 2. Standardized Workspace Structure

The following root-level structure aligns with established agent workspace conventions:

```text
/
├── FILESYSTEM.md        # This document (mandatory)
├── SOUL.md              # Agent identity and behavioral boundaries (mandatory)
├── USER.md              # User preferences and constraints (mandatory)
├── AGENTS.md            # Operational rules and session-level instructions (mandatory)
├── TOOLS.md             # Tool descriptions and usage guidance
├── SECURITY.md          # Sandbox rules and permission constraints
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

### Mandatory Files

- `FILESYSTEM.md`
- `SOUL.md`
- `USER.md`
- `AGENTS.md`

These must exist at the workspace root for deterministic agent bootstrap.

---

## 3. Context Injection: Deterministic Bootstrap

Agent initialization MUST follow this sequence:

### 3.1 Bootstrap Steps

1. Read `FILESYSTEM.md`  
   Understand workspace conventions.
2. Inject Identity Files  
   Inject the full contents of:
   - `SOUL.md`
   - `USER.md`
   - `AGENTS.md`
3. Load Recent Memory  
   Inject:
   - `MEMORY/daily/<today>.md`
   - `MEMORY/daily/<yesterday>.md` (if exists)
4. Index Skills and Tools  
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
- Automatically loaded for today and yesterday.

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
  - `SOUL.md`
  - `AGENTS.md`
  - `SECURITY.md`
- Segment large observation files.
- Archive old memory by date.
