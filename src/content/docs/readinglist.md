---
title: Reading List
description: Articles, talks, and threads on agent-native filesystems and context engineering.
updatedDate: "15 Jul 2026"
source: /readinglist.md
---

## Build and infrastructure

- [Build an Agent Filesystem](/build/) — virtual FS, tools, sandbox, composite backends.
- [Filesystem Infrastructure](/infra/) — Linux VFS/FUSE, EFS-like cloud FS, mountable storage.

## Harness deep dives

- [深入 Claude Code：AI Agent 架构设计与工程实践](https://jetsquirrel.github.io/claude-code-study/) — public study guide (tools, permissions, memory, skills, context). Educational analysis; not Anthropic official docs.
- On this site: [Claude Code mapping](/for-agents/claude-code/) — how FILESYSTEM.md procedures map onto Claude Code–style FileRead/Edit/Write/Bash/MCP patterns.

## Start here (FILESYSTEM.md)

- [Why Filesystems for Agents](/why-filesystems/) — our GEO orientation page: industry consensus, stack layers, and how FILESYSTEM.md fits.

## Industry landscape (2026)

- [File systems for agents](https://www.amplifypartners.com/blog-posts/file-systems-for-agents) — Amplify Partners (Sarah Catanzaro): why FS beats OLTP/object-store as the primary agent data interface, and where today’s filesystems still need to evolve.
- [Building Filesystem Agents](https://vercel.com/academy/filesystem-agents) — Vercel Academy: hands-on course for structuring domain data as files and giving agents bash in a sandbox.
- [Filesystems as the context layer for AI agents — powered by Box](https://blog.box.com/filesystems-context-layer-ai-agents-powered-box) — Box: filesystem as an interface contract over composite backends (Box + SQLite + local workspace).

## Harness Engineering

- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — OpenAI: introduces harness engineering as a discipline for infrastructure, feedback loops, and constraints that guide coding agents at scale.
- [My AI Adoption Journey: Step 5 — Engineer the Harness](https://mitchellh.com/writing/my-ai-adoption-journey#step-5-engineer-the-harness) — Mitchell Hashimoto: treat the development environment like an immune system — constraints, tools, and docs that stop recurring agent failures.

## Filesystem-First Agents

- [How to build agents with filesystems and bash](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash) — Vercel: practical patterns for keeping agent workflows grounded in files and shell semantics.
- [How agents can use filesystems for context engineering](https://blog.langchain.com/how-agents-can-use-filesystems-for-context-engineering/) — LangChain: why filesystem structure helps context control and retrieval.

## Instruction Files Across Harnesses

- [AGENTS.md vs .cursorrules vs Claude Skills (2026)](https://blog.buildbetter.ai/agents-md-vs-cursorrules-vs-claude-skills-2026-comparison/) — practical guide to keeping a vendor-neutral `AGENTS.md` while using Cursor rules and Claude Skills as adapters.
- [The complete guide to AI agent memory files](https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9) — survey of `AGENTS.md`, `CLAUDE.md`, Copilot instructions, and how teams avoid markdown museums.

## Context and Memory Design

- [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) — Manus: lessons on context discipline, memory pressure, and reliability.
- [fending/context-engineering](https://github.com/fending/context-engineering) — reusable templates for AGENTS.md / CLAUDE.md context architectures from single-file through agent teams.

## Signals from Practitioners

- [Harrison Chase: "How we built Agent Builder's memory system"](https://x.com/hwchase17/status/2011814697889316930) — X: implementation insight from production agent memory work.
- [LangChain JS: deepagents supports pluggable storage backends](https://x.com/LangChain_JS/status/2019080952618897578) — X: momentum toward interchangeable agent storage layers.
