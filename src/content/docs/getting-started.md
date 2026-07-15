---
title: "Getting Started with FILESYSTEM.md"
description: "Step-by-step guide to adopt the FILESYSTEM.md standard in a project."
updatedDate: "15 Jul 2026"
source: "/getting-started.md"
---

## 1. Create the Core Contract

At your project root, create:

- `FILESYSTEM.md` (**required**) — workspace structure, bootstrap, and loading rules
- `AGENTS.md` (**recommended**) — shared operating rules for every coding harness

Optionally add identity overlays when useful:

- `SOUL.md` — agent principles / non-negotiable boundaries
- `USER.md` — human preferences and workflow habits

Do **not** treat `SOUL.md` / `USER.md` as mandatory. Many teams only need `FILESYSTEM.md` + `AGENTS.md`.

## 2. Add the Standard Directories

Create this baseline structure:

```text
/
├── FILESYSTEM.md
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

Add `SOUL.md` / `USER.md` only if you want explicit identity overlays.

## 3. Define Bootstrap Rules in `FILESYSTEM.md`

Document deterministic startup:

1. Read `FILESYSTEM.md`.
2. Inject `AGENTS.md`, then any optional identity overlays that exist.
3. Load `MEMORY/daily/<today>.md` and optionally yesterday.
4. Index `SKILLS/` and `TOOLS.md`.

Keep bootstrap minimal. Everything else should be on-demand.

## 4. Bridge Harnesses (Adapters, Not Forks)

Keep narrative rules in `AGENTS.md`. Map to tool-native files thinly:

- **Claude Code**: symlink or `@`-import `AGENTS.md` from `CLAUDE.md` (see [Claude Code mapping](/for-agents/claude-code/) and the [Claude Code study guide](https://jetsquirrel.github.io/claude-code-study/))
- **Cursor**: rely on `AGENTS.md`; use `.cursor/rules/` only for scoped IDE overrides
- **Codex / Copilot / other AGENTS.md readers**: use the shared file directly

Avoid maintaining five divergent copies of the same instructions.

## 5. Add Constraints and Safety

- `AGENTS.md`: sandboxing, editing rules, review expectations
- `SECURITY.md`: allowed paths, secret handling, escalation policy
- Optional `SOUL.md` / `USER.md`: stable principles and preference overlays

## 6. Start Logging and Memory

- Write a daily summary to `MEMORY/daily/YYYY-MM-DD.md`.
- Store raw external findings in `MEMORY/observations/`.
- Move durable insights to `MEMORY/learned/`.
- Append execution traces to `LOGS/` (no silent rewrites).

## 7. Add Skills

Each reusable capability lives in `SKILLS/<name>/SKILL.md` with:

- purpose
- inputs
- outputs
- permission requirements
- examples

Load skills only when a task needs them.

## 8. Minimal Example

```text
FILESYSTEM.md
AGENTS.md
SKILLS/
  web-research/
    SKILL.md
PROJECTS/
  docs-site/
    draft.md
MEMORY/
  daily/YYYY-MM-DD.md
LOGS/
  YYYY-MM-DD.log
```

## 9. Framework Integration Pattern

No framework lock-in is required. Keep frameworks as adapters around the same filesystem contract.

- LangChain / LlamaIndex: map tools and indexes to reads and writes in `PROJECTS/`, `MEMORY/`, and `LOGS/`.
- Coding harnesses: share `AGENTS.md`; keep provider-specific configs thin.
- Custom runtimes: keep the same bootstrap file contract so multiple agents remain interoperable.

## 10. Adoption Checklist

- `FILESYSTEM.md` exists at root and documents bootstrap.
- Shared behavior lives in `AGENTS.md` (or is clearly mapped from it).
- Identity overlays are optional and not duplicated per tool.
- Memory layers are separated.
- Skills are modular and on-demand.
- Logs are append-only.
- Security boundaries are explicit.
- Point coding agents at [`/for-agents/`](/for-agents/) (start with the [cheatsheet](/for-agents/cheatsheet/)).
