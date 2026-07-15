---
title: "FILESYSTEM.md FAQ"
description: "Common questions about FILESYSTEM.md and agent-native filesystem design."
updatedDate: "15 Jul 2026"
source: "/faq.md"
---

## What is FILESYSTEM.md in one sentence?

It is a standard that treats the filesystem as the primary interface for agent memory, execution, safety, and (optionally) identity overlays.

## Is this only for coding agents?

No. Coding workflows are a strong fit, but the same structure also helps research, analysis, and content workflows where traceability matters.

## How is this different from just writing docs?

The key difference is deterministic bootstrap and structure. FILESYSTEM.md defines which files are always loaded, what is on-demand, and where memory and logs live.

## Does FILESYSTEM.md replace AGENTS.md, CLAUDE.md, or Cursor rules?

No. FILESYSTEM.md is the **workspace contract**. `AGENTS.md` is the recommended shared **behavior** file. Tool-native files (`CLAUDE.md`, `.cursor/rules/`, etc.) should be thin adapters that point at the shared contract — not competing sources of truth.

## Are SOUL.md and USER.md required?

No. They are **optional identity overlays**. Many projects only need `FILESYSTEM.md` + `AGENTS.md`. Use `SOUL.md` / `USER.md` when you want explicit principles or preference layers that are separate from operating rules.

## Is FILESYSTEM.md tied to one model provider or framework?

No. It is provider-agnostic and framework-agnostic. The contract is filesystem-based, not API-specific, and is designed to work across Codex, Cursor, Claude Code, Copilot, and custom runtimes.

## How much context should be injected at startup?

As little as possible: `FILESYSTEM.md`, shared behavior (`AGENTS.md` or its adapter), optional identity overlays if present, and recent daily memory. Load everything else only when required.

## Why append-only logs?

Append-only logs improve auditability, postmortem analysis, and safety review by preserving a reliable execution history.

## Where should secrets go?

Outside injected markdown files. Access secrets through controlled runtime interfaces and explicit permissions.

## How should teams adopt this?

Start with one project: add `FILESYSTEM.md` + `AGENTS.md`, create `MEMORY/` / `SKILLS/` / `LOGS/`, bridge your primary harness, run for a week, then refine skill boundaries and memory practices based on real tasks.
