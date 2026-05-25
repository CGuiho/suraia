# Repository Notes

- The project is a monorepo containing packages under `packages/`.
- `@guiho/suraia` (core) is an AI-first UI blueprint library. Component sources of truth (HTML anatomy, CSS styles, behavior controller JS, and accessibility specs) reside in `packages/core/src/components/`.
- Framework adapters (React, ArrowJS, Remix, Web Components) are located under their respective packages in `packages/`.
- Use Bun, not npm/pnpm/yarn. Install dependencies from the workspace root or individual packages using `bun install`.
- Place all file exports at the top of the file, immediately following any imports, so it is easy to see what is exported at a glance.

## Memory

- `MEMORY.md` is the persistent memory file for this repository. Agents must read it at the start of every session and update it at the end of every session.
- Use `MEMORY.md` to record decisions, preferences, ongoing work, client context, project state, and any information that should survive between sessions.
- Do not rely on conversation history alone for context; always persist important facts to `MEMORY.md`.
- When updating, append new entries with a timestamp and keep the file organized by topic sections. Do not delete prior entries unless explicitly asked.


## Project Management with ClickUp

This repository is the G2008 GUIHO Web40 project. The ClickUp home for this repo is at:
https://app.clickup.com/9015748215/v/b/6-901521338736-2
This URL opens the **GUIHO Web40** list inside the **GUIHO Web40** space (space ID: `901510090571`).

- This project is managed on ClickUp using the `cup` CLI tool. Load the `clickup` skill before working with tasks.
- Create and track all tasks in the **GUIHO Web40** list (`901521338736`).
- Use `cup tasks --list 901521338736` to see existing tasks. Use `cup create -l 901521338736` to create new ones.
- Statuses available: `to do`, `on hold`, `scheduled`, `in progress`, `testing`, `complete`.
- When asked what work is left, what is done, or what is on hold, use `cup tasks --list 901521338736 --status "<status>"` and answer from the results instead of guessing from chat history.
- When asked what work is left, what is done, or what is on hold, inspect `.agentkanban/board.yaml` and `.agentkanban/tasks/**/*.md` and answer from those files instead of guessing from chat history.
