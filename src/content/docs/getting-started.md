---
title: "Getting Started with FILESYSTEM.md"
description: "Step-by-step guide to adopt the FILESYSTEM.md standard in a project."
source: "/getting-started.md"
---

## 1. Create the Core Files

At your project root, create these required files:

- `FILESYSTEM.md`
- `SOUL.md`
- `USER.md`
- `AGENTS.md`

These define workspace rules, agent identity, user preferences, and execution boundaries.

## 2. Add the Standard Directories

Create this baseline structure:

```text
/
├── FILESYSTEM.md
├── SOUL.md
├── USER.md
├── AGENTS.md
├── TOOLS.md
├── SECURITY.md
├── SKILLS/
├── PROJECTS/
├── MEMORY/
│   ├── daily/
│   ├── observations/
│   └── learned/
└── LOGS/
```

## 3. Define Bootstrap Rules in `FILESYSTEM.md`

Document deterministic startup:

1. Read `FILESYSTEM.md`.
2. Inject `SOUL.md`, `USER.md`, `AGENTS.md`.
3. Load `MEMORY/daily/<today>.md` and optionally yesterday.
4. Index `SKILLS/` and `TOOLS.md`.

Keep bootstrap minimal. Everything else should be on-demand.

## 4. Add Identity and Constraints

Use these files for stable behavior:

- `SOUL.md`: role, principles, non-negotiable boundaries.
- `USER.md`: preferred style, constraints, workflow habits.
- `AGENTS.md`: runtime policy (sandboxing, editing rules, review expectations).
- `SECURITY.md`: allowed paths, secret handling, escalation policy.

## 5. Start Logging and Memory

- Write a daily summary to `MEMORY/daily/YYYY-MM-DD.md`.
- Store raw external findings in `MEMORY/observations/`.
- Move durable insights to `MEMORY/learned/`.
- Append execution traces to `LOGS/` (no silent rewrites).

## 6. Add Skills

Each reusable capability lives in `SKILLS/<name>/SKILL.md` with:

- purpose
- inputs
- outputs
- permission requirements
- examples

Load skills only when a task needs them.

## 7. Minimal Example

```text
SKILLS/
  web-research/
    SKILL.md
PROJECTS/
  docs-site/
    draft.md
MEMORY/
  daily/2026-02-22.md
LOGS/
  2026-02-22.log
```

## 8. Framework Integration Pattern

No framework lock-in is required. Keep frameworks as adapters around the same filesystem contract.

- LangChain: map agents/tools to reads and writes in `PROJECTS/`, `MEMORY/`, and `LOGS/`.
- LlamaIndex: treat filesystem documents as the source of truth and index selectively.
- Custom runtimes: keep the same bootstrap file contract so multiple agents remain interoperable.

## 9. Adoption Checklist

- Core files exist at root.
- Bootstrap sequence is documented.
- Memory layers are separated.
- Skills are modular and on-demand.
- Logs are append-only.
- Security boundaries are explicit.

