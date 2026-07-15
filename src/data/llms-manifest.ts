import { siteConfig } from "@/site.config";
import build from "../content/docs/build.md?raw";
import buildComposite from "../content/docs/build-composite.md?raw";
import buildSandbox from "../content/docs/build-sandbox.md?raw";
import buildTools from "../content/docs/build-tools.md?raw";
import buildVirtualFs from "../content/docs/build-virtual-fs.md?raw";
import community from "../content/docs/community.md?raw";
import compare from "../content/docs/compare.md?raw";
import faq from "../content/docs/faq.md?raw";
import filesystem from "../content/docs/filesystem.md?raw";
import forAgents from "../content/docs/for-agents.md?raw";
import forAgentsBootstrap from "../content/docs/for-agents-bootstrap.md?raw";
import forAgentsCheatsheet from "../content/docs/for-agents-cheatsheet.md?raw";
import forAgentsClaudeCode from "../content/docs/for-agents-claude-code.md?raw";
import forAgentsMemory from "../content/docs/for-agents-memory.md?raw";
import forAgentsOperations from "../content/docs/for-agents-operations.md?raw";
import forAgentsSafety from "../content/docs/for-agents-safety.md?raw";
import forAgentsSkills from "../content/docs/for-agents-skills.md?raw";
import gettingStarted from "../content/docs/getting-started.md?raw";
import infra from "../content/docs/infra.md?raw";
import infraCloudFs from "../content/docs/infra-cloud-fs.md?raw";
import infraLinuxFuse from "../content/docs/infra-linux-fuse.md?raw";
import infraMounts from "../content/docs/infra-mounts.md?raw";
import readinglist from "../content/docs/readinglist.md?raw";
import showcase from "../content/docs/showcase.md?raw";
import whyFilesystems from "../content/docs/why-filesystems.md?raw";

export type LlmsSectionGroup = "agents" | "build" | "infra" | "specification" | "community";

export interface LlmsSection {
	id: string;
	title: string;
	description: string;
	/** Absolute raw markdown URL path (site-relative). */
	path: string;
	/** Optional HTML reading page. */
	htmlPath?: string;
	group: LlmsSectionGroup;
	raw: string;
}

/** Stable publish metadata for LLM discovery files. */
export const llmsMeta = {
	license: "MIT",
	lastUpdated: "2026-07-16",
	siteUrl: siteConfig.url.replace(/\/$/, ""),
} as const;

/**
 * Single source of truth for llms.txt index + llms-full.txt body.
 * Order matters for llms-full: For Agents manuals first, then specification.
 */
export const llmsSections: LlmsSection[] = [
	{
		id: "for-agents-cheatsheet",
		title: "Agent Cheatsheet",
		description: "One-page injectable operating card for FILESYSTEM.md agents.",
		path: "/for-agents/cheatsheet.md",
		htmlPath: "/for-agents/cheatsheet/",
		group: "agents",
		raw: forAgentsCheatsheet,
	},
	{
		id: "for-agents",
		title: "For Agents",
		description: "Operating manual hub — what to read, in what order, for coding agents.",
		path: "/for-agents.md",
		htmlPath: "/for-agents/",
		group: "agents",
		raw: forAgents,
	},
	{
		id: "for-agents-bootstrap",
		title: "Agent Bootstrap",
		description: "Deterministic session bootstrap — inject order and what to defer.",
		path: "/for-agents/bootstrap.md",
		htmlPath: "/for-agents/bootstrap/",
		group: "agents",
		raw: forAgentsBootstrap,
	},
	{
		id: "for-agents-operations",
		title: "Agent Operations",
		description: "Orient → plan → execute → log filesystem operation loop.",
		path: "/for-agents/operations.md",
		htmlPath: "/for-agents/operations/",
		group: "agents",
		raw: forAgentsOperations,
	},
	{
		id: "for-agents-memory",
		title: "Agent Memory",
		description: "How to use MEMORY/daily, observations, and learned layers.",
		path: "/for-agents/memory.md",
		htmlPath: "/for-agents/memory/",
		group: "agents",
		raw: forAgentsMemory,
	},
	{
		id: "for-agents-skills",
		title: "Agent Skills",
		description: "When and how to load SKILLS/*/SKILL.md on demand.",
		path: "/for-agents/skills.md",
		htmlPath: "/for-agents/skills/",
		group: "agents",
		raw: forAgentsSkills,
	},
	{
		id: "for-agents-safety",
		title: "Agent Safety",
		description: "Workspace boundaries, secrets, append-only logs, and prohibited actions.",
		path: "/for-agents/safety.md",
		htmlPath: "/for-agents/safety/",
		group: "agents",
		raw: forAgentsSafety,
	},
	{
		id: "for-agents-claude-code",
		title: "Claude Code Mapping",
		description:
			"Map FILESYSTEM.md procedures to Claude Code–style tools; links the public Claude Code study guide.",
		path: "/for-agents/claude-code.md",
		htmlPath: "/for-agents/claude-code/",
		group: "agents",
		raw: forAgentsClaudeCode,
	},
	{
		id: "build",
		title: "Build an Agent Filesystem",
		description: "Virtual FS, tool layer, sandbox, and composite backends for agent runtimes.",
		path: "/build.md",
		htmlPath: "/build/",
		group: "build",
		raw: build,
	},
	{
		id: "build-virtual-fs",
		title: "Virtual Filesystem for Agents",
		description: "Path-oriented virtual FS API agents can navigate with list/read/write semantics.",
		path: "/build/virtual-fs.md",
		htmlPath: "/build/virtual-fs/",
		group: "build",
		raw: buildVirtualFs,
	},
	{
		id: "build-tools",
		title: "Agent Filesystem Tool Layer",
		description: "Bind FS ops to agent tools — schemas, concurrency, FILESYSTEM.md mapping.",
		path: "/build/tools.md",
		htmlPath: "/build/tools/",
		group: "build",
		raw: buildTools,
	},
	{
		id: "build-sandbox",
		title: "Sandboxing Agent Filesystems",
		description: "Path jails, process sandboxes, network policy, and resettable workspaces.",
		path: "/build/sandbox.md",
		htmlPath: "/build/sandbox/",
		group: "build",
		raw: buildSandbox,
	},
	{
		id: "build-composite",
		title: "Composite Filesystem Backends",
		description: "Route path prefixes to local disk, SQLite, object stores, or DMS backends.",
		path: "/build/composite.md",
		htmlPath: "/build/composite/",
		group: "build",
		raw: buildComposite,
	},
	{
		id: "infra",
		title: "Filesystem Infrastructure",
		description: "Linux VFS/FUSE, cloud shared FS (EFS-like), and mountable storage survey.",
		path: "/infra.md",
		htmlPath: "/infra/",
		group: "infra",
		raw: infra,
	},
	{
		id: "infra-linux-fuse",
		title: "Linux VFS and FUSE for Agents",
		description: "Kernel VFS concepts and FUSE user mounts for agent-visible filesystems.",
		path: "/infra/linux-fuse.md",
		htmlPath: "/infra/linux-fuse/",
		group: "infra",
		raw: infraLinuxFuse,
	},
	{
		id: "infra-cloud-fs",
		title: "Cloud Filesystems for Agents",
		description: "EFS-like shared FS vs object storage for agent read/write loops.",
		path: "/infra/cloud-fs.md",
		htmlPath: "/infra/cloud-fs/",
		group: "infra",
		raw: infraCloudFs,
	},
	{
		id: "infra-mounts",
		title: "Mountable Storage for Agent Workspaces",
		description: "Bind mounts, NFS/EFS, FUSE gateways, and sandbox mount policy.",
		path: "/infra/mounts.md",
		htmlPath: "/infra/mounts/",
		group: "infra",
		raw: infraMounts,
	},
	{
		id: "manifesto",
		title: "Manifesto",
		description:
			"Full ANF specification — core philosophy, workspace structure, context injection, memory model, skills, execution model, and security rules.",
		path: "/filesystem.md",
		htmlPath: "/posts/filesystem-manifesto/",
		group: "specification",
		raw: filesystem,
	},
	{
		id: "getting-started",
		title: "Getting Started",
		description:
			"Step-by-step guide to adopt FILESYSTEM.md — core files, bootstrap sequence, memory layers, skills, and an adoption checklist.",
		path: "/getting-started.md",
		htmlPath: "/getting-started/",
		group: "specification",
		raw: gettingStarted,
	},
	{
		id: "why-filesystems",
		title: "Why Filesystems for Agents",
		description:
			"Industry consensus on filesystem-first agents (Amplify, Vercel, Box, LangChain) and how FILESYSTEM.md fits as the workspace contract.",
		path: "/why-filesystems.md",
		htmlPath: "/why-filesystems/",
		group: "specification",
		raw: whyFilesystems,
	},
	{
		id: "faq",
		title: "FAQ",
		description:
			"Common questions about FILESYSTEM.md — what it is, how it differs from other standards, context injection, and secrets handling.",
		path: "/faq.md",
		htmlPath: "/faq/",
		group: "specification",
		raw: faq,
	},
	{
		id: "compare",
		title: "Compare Standards",
		description:
			"How FILESYSTEM.md relates to AGENTS.md, harness adapters, optional identity overlays, and MCP.",
		path: "/compare.md",
		htmlPath: "/compare/",
		group: "specification",
		raw: compare,
	},
	{
		id: "showcase",
		title: "Showcase",
		description: "Real-world projects and implementations using agent-native filesystem patterns.",
		path: "/showcase.md",
		htmlPath: "/showcase/",
		group: "community",
		raw: showcase,
	},
	{
		id: "readinglist",
		title: "Reading List",
		description:
			"Curated references on agent-native design, context engineering, and filesystem conventions.",
		path: "/readinglist.md",
		htmlPath: "/readinglist/",
		group: "community",
		raw: readinglist,
	},
	{
		id: "community",
		title: "Community",
		description: "How to propose changes, submit examples, and contribute to the spec.",
		path: "/community.md",
		htmlPath: "/community/",
		group: "community",
		raw: community,
	},
];

export function absoluteUrl(path: string): string {
	return `${llmsMeta.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip YAML frontmatter from a markdown document. */
export function stripFrontmatter(markdown: string): string {
	return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trimStart();
}

export function buildLlmsTxt(): string {
	const linkBlock = (group: LlmsSectionGroup) =>
		llmsSections
			.filter((s) => s.group === group)
			.map((s) => `- [${s.title}](${absoluteUrl(s.path)}): ${s.description}`)
			.join("\n");

	return `# FILESYSTEM.md

> FILESYSTEM.md is a standardized, interoperable specification for Agent-Native Filesystems (ANF). It defines how AI coding agents interact with a project's filesystem — providing a dedicated, predictable structure for agent identity, memory, execution, and safety.

Think of FILESYSTEM.md as a README for agents: a markdown-first contract that any AI agent can read and follow, without proprietary lock-in.

If you are an agent starting a session, fetch ${absoluteUrl("/for-agents/cheatsheet.md")} first.
If you are building an agent filesystem runtime, start at ${absoluteUrl("/build.md")}.
For OS/cloud mounts, start at ${absoluteUrl("/infra.md")}.
For complete inline content, fetch ${absoluteUrl("/llms-full.txt")}.

## Metadata

- Site: ${absoluteUrl("/")}
- License: ${llmsMeta.license}
- Last updated: ${llmsMeta.lastUpdated}
- Full context: ${absoluteUrl("/llms-full.txt")}
- HTML hub: ${absoluteUrl("/")}

## For Agents

${linkBlock("agents")}

## Build (runtime)

${linkBlock("build")}

## Infrastructure

${linkBlock("infra")}

## Specification

${linkBlock("specification")}

## Community

${linkBlock("community")}

## Human-readable pages (optional)

${llmsSections
	.filter((s): s is LlmsSection & { htmlPath: string } => Boolean(s.htmlPath))
	.map((s) => `- [${s.title}](${absoluteUrl(s.htmlPath)})`)
	.join("\n")}

## Key Concepts

- **Agent-Native Filesystem (ANF)**: A filesystem structure designed for AI agents, not just humans.
- **Deterministic Bootstrap**: Read FILESYSTEM.md, inject AGENTS.md (and optional identity overlays), load recent memory, index skills.
- **Portable Behavior Contract**: Keep shared rules in AGENTS.md; treat CLAUDE.md / Cursor rules as thin adapters.
- **Virtual FS + tools**: Application path API and tool bindings agents call ([Build](${absoluteUrl("/build.md")})).
- **Composite backends**: One tree, many stores (local, SQLite, object/DMS).
- **On-Demand Loading**: Large memory and skill definitions are loaded only when required, conserving context window.
- **Append-Only Logs**: All agent actions are recorded, never silently overwritten — enabling auditability and recovery.
- **Security by Structure**: Clear read/write boundaries enforced through filesystem layout, not runtime code.

## Relationship to Other Standards

| Standard / Pattern | Scope |
|---|---|
| FILESYSTEM.md | Workspace contract for agent memory, operations, and loading rules |
| AGENTS.md | Shared, vendor-neutral behavior rules |
| CLAUDE.md / .cursor/rules / similar | Harness adapters — not a second source of truth |
| SOUL.md / USER.md | Optional identity and preference overlays |
| MCP | Tool and data connectivity protocol |

Together: FILESYSTEM.md (filesystem contract) + AGENTS.md + thin harness adapters + optional overlays + MCP = complete agentic stack.
`;
}

export function buildLlmsFullTxt(): string {
	const sections = llmsSections
		.map((s) => {
			const body = stripFrontmatter(s.raw).trimEnd();
			return `## ${s.title}\n\nSource: ${absoluteUrl(s.path)}\n\n${body}`;
		})
		.join("\n\n---\n\n");

	return `# FILESYSTEM.md — Full Specification Context

> Complete inline copy of the FILESYSTEM.md documentation set for LLM consumption.
> License: ${llmsMeta.license}. Last updated: ${llmsMeta.lastUpdated}.
> Index: ${absoluteUrl("/llms.txt")}
> Agents: start with ${absoluteUrl("/for-agents/cheatsheet.md")}

${sections}
`;
}
