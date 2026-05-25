# Repository Notes

- This is a single-package repo — not a monorepo. All code lives under the `suraia/` directory. All commands must be run from within `suraia/`.
- `@guiho/suraia` is an AI-first UI blueprint library. Component sources of truth (`.json` spec, `.structure.html`, `.css`, `.ts` behavior controller, `.md`, `.test.ts`) reside in `suraia/source/components/<component>/`.
- No framework adapters (React, ArrowJS, etc.) exist yet; they're planned future outputs, not current packages.
- Use Bun, not npm/pnpm/yarn. Install with `bun install` from within `suraia/`.
- Place all file exports at the top of the file, immediately following any imports, so it is easy to see what is exported at a glance.

## Commands

Run all commands from the `suraia/` directory:

- Install: `bun install`
- Typecheck: `bun run typecheck` (runs `tsc -p . --noEmit`)
- Test: `bun test` (Bun built-in; no `test` script in package.json)
- Build: `bun run build` (compiles `source/` → `library/` via `tsc`)
- Dev: `bun run dev` (watches and runs the CLI entrypoint)
- Binary: `bun run binary` (compiles CLI to standalone executable in `bin/`)

Lint is not configured (no ESLint/Biome). Typecheck is the primary quality gate.

## TypeScript Quirks

- `verbatimModuleSyntax: true` — must use `import type { ... }` for type-only imports. `import { SomeType }` will fail typecheck if `SomeType` is only used as a type.
- `noUnusedLocals: true` and `noUnusedParameters: true` — unused variables/params fail typecheck.
- `moduleResolution: "bundler"` — use extensionless relative imports.
- Test files use `.test.ts` suffix. Files ending in `.spec.ts` are excluded from compilation (`tsconfig.json` excludes `source/**/*.spec.ts`).

## Directory Layout

```
suraia/
  source/            # All source code (tsconfig rootDir)
    components/      # Component blueprints (button/, input/, card/, badge/, dialog/)
    styles/          # Global CSS + TS styling utilities (colors, reset, functions)
    themes/          # Design tokens (CSS custom properties + TS constants)
  library/           # Build output (gitignored, tsc outDir)
  bin/               # Compiled CLI binaries (gitignored)
  schemas/           # JSON Schema for design tokens
  docs/              # LLM instructions (opacity/color guidelines)
```

Build artifacts (`library/`, `bundle/`, `bin/`) are gitignored.

## Key Conventions

- CSS class prefix: `.suraia-`, CSS variable prefix: `--suraia-`, data attrs: `data-suraia-*`.
- Every `.ts` file starts with `/** @copyright Copyright © 2026 GUIHO Technologies ... */`. Every `.css` file starts with `/*! Copyright ... */`.
- CSS and TS token files are kept in sync: `themes/base-tokens.css` ↔ `themes/base-tokens.ts`, `styles/colors.css` ↔ `styles/colors.ts`.
- Opacity in CSS: use `color-mix(in srgb, var(--color) var(--suraia-alpha-N), transparent)`. Opacity in TS: use the `alpha()` utility from `styles/functions.ts`.

## Package & Publishing

- Package name: `@guiho/suraia`. Publishes to both **npm** and **JSR**.
- `jsr.json` exports source TypeScript directly; `package.json` exports compiled output from `library/`.
- Versioning uses `@guiho/mirror` (configured in `mirror.config.toml`). Version is synced across `package.json`, `jsr.json`, and git tags.
- The `.github/_workflows/` CI files have `working-directory: mirror` — they are stale/copied from another project and do **not** match the suraia package structure.

## Styles & Tokens Architecture

- Design tokens follow DTCG spec (validated by `schemas/tokens.json`).
- `base-tokens.css` maps tokens to `:root` CSS custom properties.
- `functions.css` provides utility variables (`--suraia-px-to-rem`, `--suraia-alpha-*`).
- `functions.ts` provides `rem()`, `fluid()`, and `alpha()` utilities.
- `reset.css` is scoped to `.suraia-root` — not global.
- See `docs/llm-instructions.md` for color opacity guidelines.


## Document Writing

- Create every new project document inside `docs/` unless the user explicitly asks for a different path.
- Prefix every new document filename with the current ISO date: `YYYY-MM-DD`.
- Use lowercase filenames with words separated by hyphens.
- Use this naming pattern: `docs/YYYY-MM-DD-document-name.md`.
- Example: `docs/2026-05-25-website-creation-process.md`.
- Do not create new root-level Markdown documents for project docs; root Markdown is reserved for established repository files such as `AGENTS.md`, `README.md`, `MEMORY.md`, `NOTES.md`, etc.

## Memory

- `MEMORY.md` is the persistent memory file for this repository. Agents must read it at the start of every session and update it at the end of every session.
- Use `MEMORY.md` to record decisions, preferences, ongoing work, client context, project state, and any information that should survive between sessions.
- Do not rely on conversation history alone for context; always persist important facts to `MEMORY.md`.
- When updating, append new entries with a timestamp and keep the file organized by topic sections. Do not delete prior entries unless explicitly asked.

## Notes

- `NOTES.md` is the repository note file. When the user asks to note something, retrieve a note, check notes, or review notes, use `NOTES.md`.
- Notes should include metadata such as creation date, last updated date, review deadline, status, topic, source/context, and related URLs when available.
- Keep notes concise and easy to scan; tables are acceptable for review queues and URL lists.
- Do not store long-term project decisions only in `NOTES.md`; persist durable decisions in `MEMORY.md` too.

## Project Management with ClickUp

This repository is the G2008 GUIHO Web40 project. The ClickUp home for this repo is at:
https://app.clickup.com/9015748215/v/b/li/901523550736
This URL opens the **GUIHO Suraia** list inside the **GUIHO Engineering** space (space ID: `90152559592`).

- This project is managed on ClickUp using the `cup` CLI tool. Load the `clickup` skill before working with tasks.
- Create and track all tasks in the **GUIHO Suraia** list (`901523550736`).
- Use `cup tasks --list 901523550736` to see existing tasks. Use `cup create -l 901523550736` to create new ones.
- Statuses available: `to do`, `on hold`, `scheduled`, `in progress`, `testing`, `complete`.
- When asked what work is left, what is done, or what is on hold, use `cup tasks --list 901523550736 --status "<status>"` and answer from the results instead of guessing from chat history.
- When asked what work is left, what is done, or what is on hold, inspect `.agentkanban/board.yaml` and `.agentkanban/tasks/**/*.md` and answer from those files instead of guessing from chat history.
