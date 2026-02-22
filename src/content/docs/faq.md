---
title: "FILESYSTEM.md FAQ"
description: "Common questions about FILESYSTEM.md and agent-native filesystem design."
source: "/faq.md"
---

## What is FILESYSTEM.md in one sentence?

It is a standard that treats the filesystem as the primary interface for agent identity, memory, execution, and safety.

## Is this only for coding agents?

No. Coding workflows are a strong fit, but the same structure also helps research, analysis, and content workflows where traceability matters.

## How is this different from just writing docs?

The key difference is deterministic bootstrap and structure. FILESYSTEM.md defines which files are always loaded, what is on-demand, and where memory and logs live.

## Does FILESYSTEM.md replace AGENTS.md, SOUL.md, or USER.md?

No. It organizes and standardizes how those files work together at the filesystem level.

## Is FILESYSTEM.md tied to one model provider or framework?

No. It is provider-agnostic and framework-agnostic. The contract is filesystem-based, not API-specific.

## How much context should be injected at startup?

As little as possible: `FILESYSTEM.md`, identity files, and recent daily memory. Load everything else only when required.

## Why append-only logs?

Append-only logs improve auditability, postmortem analysis, and safety review by preserving a reliable execution history.

## Where should secrets go?

Outside injected markdown files. Access secrets through controlled runtime interfaces and explicit permissions.

## How should teams adopt this?

Start with one project, apply the root structure, run for a week, then refine skill boundaries and memory practices based on real tasks.

