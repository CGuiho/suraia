# Repository Notes

- The project is a monorepo containing packages under `packages/`.
- `@guiho/suraia` (core) is an AI-first UI blueprint library. Component sources of truth (HTML anatomy, CSS styles, behavior controller JS, and accessibility specs) reside in `packages/core/src/components/`.
- Framework adapters (React, ArrowJS, Remix, Web Components) are located under their respective packages in `packages/`.
- Use Bun, not npm/pnpm/yarn. Install dependencies from the workspace root or individual packages using `bun install`.

## Commands

- Install: `bun install`
- Typecheck: `bun run typecheck` (run across workspaces/packages)
- Test: `bun test`
- Build: `bun run build`

<!-- BEGIN AGENT KANBAN — DO NOT EDIT THIS SECTION -->
## Agent Kanban

Read `.agentkanban/INSTRUCTION.md` for task workflow rules.
Read `.agentkanban/memory.md` for project context.

If a task file (`.agentkanban/tasks/**/*.md`) was referenced earlier in this conversation, re-read it before responding and always respond in and at the end the task file.
<!-- END AGENT KANBAN -->
