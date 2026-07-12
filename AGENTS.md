# Repository Notes

- This is a single-package repo â€” not a monorepo. All code lives under the `suraia/` directory. All commands must be run from within `suraia/`.
- `@guiho/suraia` is an AI-first UI blueprint library. Component sources of truth (`.json` spec, `.structure.html`, `.css`, `.ts` behavior controller, `.md`, `.test.ts`) reside in `suraia/source/components/<component>/`.
- No framework adapters (React, ArrowJS, etc.) exist yet; they're planned future outputs, not current packages.
- Use Bun, not npm/pnpm/yarn. Install with `bun install` from within `suraia/`.
- Place all file exports at the top of the file, immediately following any imports, so it is easy to see what is exported at a glance.

## Key Documents

- **`ARCHITECTURE.md`** â€” Full technical architecture specification: library domains, component blueprint structure, design token system, naming conventions, and directory layout.
- **`PHILOSOPHY.md`** â€” Library philosophy and vision: why Suraia exists, the blueprint-not-component model, AI-as-compiler consumption, dependency resolution contract, component complexity tiers (Primitives â†’ Composites â†’ Patterns â†’ Blocks), and the long-term roadmap.
- **`TODO.md`** â€” Master component inventory: the complete checklist of every component that must exist in the library, organized by category (Layout, Inputs, Combobox, Buttons, Navigation, Feedback, Overlays, Data Display, Typography, Miscellaneous).

Read these documents before making architectural decisions or working on component blueprints.

## Commands

Run all commands from the `suraia/` directory:

- Install: `bun install`
- Typecheck: `bun run typecheck` (runs `tsc -p . --noEmit`)
- Test: `bun test` (Bun built-in; no `test` script in package.json)
- Build: `bun run build` (compiles `source/` â†’ `library/` via `tsc`)
- Dev: `bun run dev` (watches and runs the CLI entrypoint)
- Binary: `bun run binary` (compiles CLI to standalone executable in `bin/`)

Lint is not configured (no ESLint/Biome). Typecheck is the primary quality gate.

## TypeScript Quirks

- `verbatimModuleSyntax: true` â€” must use `import type { ... }` for type-only imports. `import { SomeType }` will fail typecheck if `SomeType` is only used as a type.
- `noUnusedLocals: true` and `noUnusedParameters: true` â€” unused variables/params fail typecheck.
- `moduleResolution: "bundler"` â€” use extensionless relative imports.
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
- Every `.ts` file starts with `/** @copyright Copyright Â© 2026 GUIHO Technologies ... */`. Every `.css` file starts with `/*! Copyright ... */`.
- CSS and TS token files are kept in sync: `themes/base-tokens.css` â†” `themes/base-tokens.ts`, `styles/colors.css` â†” `styles/colors.ts`.
- Opacity in CSS: use `color-mix(in srgb, var(--color) var(--suraia-alpha-N), transparent)`. Opacity in TS: use the `alpha()` utility from `styles/functions.ts`.

## Generated React Component Rules

- Generated Suraia React components must create both a component file and a CSS module file in the resolved Suraia-owned write directory:
  - Component file: `suraia-<component-slug>.tsx`
  - CSS module file: `suraia-<component-slug>.modules.css`
- Generated React component symbols use PascalCase with the `Suraia` prefix:
  - File `suraia-component-log-name.tsx` exports component `SuraiaComponentLogName`.
- Generated React component files must be ordered as:
  1. Import block.
  2. Export block, including `export default` when applicable.
  3. Implementation code.
- Do not inline exports on function or constant declarations in generated React component files. Do not write `export function SuraiaButton(...)` or `export const SuraiaButton = ...`. Export from the top export block instead.
- Place `export default` in the top export block unless the default export depends on a value that cannot be safely exported before later mutation or initialization.
- Import the component CSS module as `classes`:
  ```tsx
  import classes from "./suraia-component-log-name.modules.css";
  ```
- Define component props with an interface named `Props`. If the component has no public props, use an empty `interface Props {}` until specific props are introduced.
- Implement generated React components with a TypeScript `function` declaration, not an inline exported function and not an arrow function component.
- If a generated component imports another generated Suraia component, import it through the configured project alias, for example:
  ```tsx
  import { SuraiaButton } from "#suraia/suraia-button";
  ```
- Before generating a Suraia React component, check whether its component file and CSS module already exist in the resolved write directory. If they exist and the user did not explicitly request override/overwrite/regeneration, tell the user the component is already written and stop for that component.
- If only one of the expected files exists, treat it as a partial existing conversion. Report the partial state and stop unless the user explicitly requested override/overwrite/regeneration.
- If the user explicitly requests override, overwrite both generated files for that component.
- When a needed dependency component already exists locally, import it through `#suraia/*` instead of regenerating it.

## Package & Publishing

- Package name: `@guiho/suraia`. Publishes to both **npm** and **JSR**.
- `jsr.json` exports source TypeScript directly; `package.json` exports compiled output from `library/`.
- Versioning uses `@guiho/mirror` (configured in `mirror.config.toml`). Version is synced across `package.json`, `jsr.json`, and git tags.
- The `.github/_workflows/` CI files have `working-directory: mirror` â€” they are stale/copied from another project and do **not** match the suraia package structure.

## Styles & Tokens Architecture

- Design tokens follow DTCG spec (validated by `schemas/tokens.json`).
- `base-tokens.css` maps tokens to `:root` CSS custom properties.
- `functions.css` provides utility variables (`--suraia-px-to-rem`, `--suraia-alpha-*`).
- `functions.ts` provides `rem()`, `fluid()`, and `alpha()` utilities.
- `reset.css` is scoped to `.suraia-root` â€” not global.
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

## GUIHO Project

### Identity

| Field | Value |
| --- | --- |
| GUIHO Project ID | g0000 observed in current GUIHO runtime artifacts; confirm before using as a formal registry ID |
| GUIHO Subject ID | TBD - formal subject ID for this component is not declared yet |
| GUIHO Subject Name | Suraia |
| Project Family | guiho |
| Repository Directory | C:\GUIHO\suraia |
| Repository Kind | shared experimental package |
| Parent Project | GUIHO Root (C:\GUIHO\guiho) |
| Parent Component | GUIHO Root |

### Component Purpose

Experimental UI blueprint library and UI generation research package.

### Parent Context

- Parent AGENTS: [../guiho/AGENTS.md](../guiho/AGENTS.md)
- Parent TODO: [../guiho/TODO.md](../guiho/TODO.md)
- Local TODO: [./TODO.md](./TODO.md)

For the full project map, sibling components, package index, service index,
project-wide TODOs, and cross-repository coordination rules, read the parent
repository's AGENTS.md GUIHO Project section.

### Local Scope

- Kind: shared experimental package
- Work directory: .
- Primary skills: guiho-s-0004-frontend-engineer, guiho-s-0016-writing-docs
- Baseline checks: package-local typecheck/test scripts when present

### Coordination Rules

- This repository is a child of C:\GUIHO\guiho.
- Keep component-specific implementation tasks in the local TODO file.
- Keep cross-component planning and parent delegation in the parent TODO file.
- Read this component's existing local instructions before editing source code.
- Do not publish, deploy, run migrations, rotate secrets, or mutate production resources without explicit user approval.

<!-- BEGIN XDOCS — DO NOT EDIT THIS SECTION -->
## XDocs Structured Documentation

This project uses **xdocs** (`@guiho/xdocs`) for structured, machine-readable
documentation. The repository has one root `XDOCS.md` index (no frontmatter),
and each package/application has a root named `*.xdocs.md` descriptor file. Each
documented module has exactly one named `*.xdocs.md` descriptor in its directory
with YAML frontmatter (`subject`, `description`, `parent`, `children`,
`files`, `documents`, `tags`, `keywords`, `flags`). Same-directory plain
`*.md` files are companion documents and must be listed in the descriptor's
`documents` metadata map. Ordinary companion documents should also include
`keywords` in their own frontmatter.

**Load the `guiho-s-xdocs` agent skill** for any documentation work:
creating, updating, regenerating, scanning, merging, or navigating xdocs descriptors.
The skill holds the full workflow, metadata schema, and CLI reference.

Before changing documentation, read `xdocs.config.toml` and respect `[ai].mode`:

- **prompt** — announce which xdocs descriptors need updating and wait for confirmation.
- **auto** — update the relevant xdocs descriptors immediately.

Use the installed xdocs CLI for operations: `xdocs scan`, `xdocs tree`,
`xdocs generate`, `xdocs list`, `xdocs merge`, `xdocs upgrade`, and
`xdocs uninstall --dry-run`.
<!-- END XDOCS -->
