---
title: Reading List
description: Articles, talks, and threads on agent-native filesystems and context engineering.
source: /readinglist.md
---

## Harness Engineering

- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — OpenAI: introduces harness engineering as a new discipline for building infrastructure, feedback loops, and constraints to reliably guide AI coding agents at scale.
- [My AI Adoption Journey: Step 5 — Engineer the Harness](https://mitchellh.com/writing/my-ai-adoption-journey#step-5-engineer-the-harness) — Mitchell Hashimoto: practical approach to building constraints, tools, and documentation that prevent agent errors from recurring, treating the development environment like an immune system.

## Filesystem-First Agents

- [How to build agents with filesystems and bash](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash) — Vercel: practical patterns for keeping agent workflows grounded in files and shell semantics.
- [How agents can use filesystems for context engineering](https://blog.langchain.com/how-agents-can-use-filesystems-for-context-engineering/) — LangChain: explains why filesystem structure helps context control and retrieval.

## Context and Memory Design

- [Context — OpenClaw](https://docs.openclaw.ai/concepts/context): a concrete model of layered context loading with explicit boundaries.
- [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) — Manus: lessons on context discipline, memory pressure, and reliability.

## Signals from Practitioners

- [Harrison Chase: "How we built Agent Builder's memory system"](https://x.com/hwchase17/status/2011814697889316930) — X: implementation insight from production agent memory work.
- [LangChain JS: deepagents supports pluggable storage backends](https://x.com/LangChain_JS/status/2019080952618897578) — X: short update showing momentum toward interchangeable agent storage layers.
