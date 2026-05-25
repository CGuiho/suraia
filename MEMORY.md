# Suraia Project Memory

## Core Vision & Styling Rules
- **AI-First UI Blueprints:** `@guiho/suraia` is a devDependency-only library containing framework-agnostic design tokens, component anatomy, layout CSS, and behavioral JS/TS controllers.
- **Styling Policy:** Supports pure CSS, JS/TS objects, and hybrid. Everything defined in CSS stylesheets must also exist as exported TypeScript constants (e.g. `base-tokens.ts` matching `base-tokens.css`). All styles must be scoped under `.suraia-root` with prefix `x40-suraia-`.
- **Export Rule:** Place all exports at the top of TS/JS source files, immediately following imports.
- **Git Commit Workflow:** Stage and commit modifications individually, one by one.

## Current Progress & Completed Layers
1.  **Design Tokens:**
    *   `tokens.json`: Registry schema points to raw public GitHub repository path: `https://raw.githubusercontent.com/CGuiho/suraia/main/suraia/schemas/tokens.json`.
    *   `base-tokens.css` / `base-tokens.ts`: Mapped and verified.
2.  **MVP Blueprints:**
    *   **Button:** `button.json`, `button.structure.html`, `button.css`, `button.ts` (controller), `button.test.ts`, and `button.md` (spec and guidelines).
    *   **Input:** `input.json`, `input.structure.html`, `input.css`, `input.ts` (controller), `input.test.ts`, and `input.md` (spec and guidelines).

## Outstanding Roadmap & Active Kanban Tasks
- **Active Task:** [task_20260520_2_package_include.md](file:///.agentkanban/tasks/task_20260520_2_package_include.md) — Audit and configure NPM/JSR file inclusion parameters in `package.json` and `jsr.json`.
- **Pending Task:** [task_20260520_4_components_hooks_list.md](file:///.agentkanban/tasks/task_20260520_4_components_hooks_list.md) — Compile master list of components, adapter hooks, and editor integration hooks.
- **Remaining MVP Blueprints:** Card, Badge, and Dialog component folders under `suraia/source/components/`.
- **Visual Design Profiles:** Implement theme override sheets (`apple-like.css`, `material-like.css`) in `suraia/source/themes/profiles/`.
