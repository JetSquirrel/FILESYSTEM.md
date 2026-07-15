---
title: "Agent Skills"
description: "When and how agents should load SKILLS/*/SKILL.md in a FILESYSTEM.md workspace."
updatedDate: "15 Jul 2026"
source: "/for-agents/skills.md"
---

## Agent procedure

Skills are reusable capabilities. Index early; load fully only when needed.

### Layout

```text
SKILLS/
└── <skill_name>/
    └── SKILL.md
```

Each `SKILL.md` SHOULD define:

- Purpose
- Inputs
- Outputs
- Required permissions
- Example usage

### At bootstrap (SHOULD)

```text
list SKILLS/
# optionally read first heading / summary only
```

Do not inject every full `SKILL.md` into context.

### When a task needs a skill (MUST load on demand)

```text
read_file SKILLS/<skill_name>/SKILL.md
```

Then follow that skill’s inputs/outputs/permissions. If permissions exceed workspace policy, stop and ask the human.

### Choosing a skill (SHOULD)

1. Match task intent to skill purpose
2. Prefer an existing skill over inventing a parallel procedure
3. If none fits, work in `PROJECTS/` and propose a new skill to the human

### After using a skill (SHOULD)

```text
append_file LOGS/YYYY-MM-DD.log
# note skill name, inputs summary, outcome
```

Optionally record durable tips in `MEMORY/learned/`.

### Compatibility note

Harness “skills” / packs that use `SKILL.md` conventions MAY map onto this directory. Keep the FILESYSTEM.md path as the portable location even if a harness also mirrors skills elsewhere.

## Human notes

On-demand skills conserve tokens and keep specialized procedures versioned.

**Anti-patterns**

- Copy-pasting long procedures into `AGENTS.md`
- Loading all skills at session start
- Skills that embed secrets or unrestricted shell escape hatches
- Duplicate skills with divergent instructions per harness
