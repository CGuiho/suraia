# Suraia Project Memory

## Core Vision & Styling Rules
- **AI-First UI Blueprints:** `@guiho/suraia` is a devDependency-only library containing framework-agnostic design tokens, component anatomy, layout CSS, and behavioral JS/TS controllers.
- **Styling Policy:** Supports pure CSS, JS/TS objects, and hybrid. Everything defined in CSS stylesheets must also exist as exported TypeScript constants (e.g. `base-tokens.ts` matching `base-tokens.css`). All styles must be scoped under `.suraia-root` with prefix `suraia-`.
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

## 2026-05-25 — Philosophy Document & Vision Alignment
- **Created:** `docs/2026-05-25-philosophy.md` — comprehensive philosophy document articulating the full library vision.
- **Confirmed Alignment:** Owner's verbal description matches ARCHITECTURE.md precisely. Key points validated:
  - Suraia is a **blueprint library**, not a framework-specific component library.
  - AI reads blueprints and generates native components into the developer's project.
  - Components are generated **once**, stored locally, and fully owned by the developer.
  - Same blueprint generates React, Vue, Angular, Svelte, Vanilla, or any framework.
  - **devDependency only** — zero production runtime footprint.
- **New concept explicitly documented:** Dependency resolution contract — complex components declare dependencies on simpler ones; AI must resolve and generate them in dependency order before generating the complex component.
- **Component complexity tiers documented:** Tier 1 (Primitives) → Tier 2 (Composites) → Tier 3 (Patterns) → Tier 4 (Blocks).
- **Long-term vision documented:** Hero sections, app shells, full page blueprints, multi-platform expansion (React Native, Flutter, SwiftUI).

## 2026-05-25 — Design Tokens & Component Implementation Sprint

### Design Token Updates
- **Primary color changed:** `#2563eb` (blue) → `#7950f2` (violet) — updated in `tokens.json`, `base-tokens.css`, `base-tokens.ts`.
- **Secondary color changed:** `#475569` → `#4a5167` (blue-gray).
- **Full token system complete:** Fonts (sizes, weights, line-heights, headings, display), spacing (1-12 scale), radius (none-full), shadows (xs-xl), z-index, transitions, component sizes (xs-xl), glass effects, opacity/cursor disabled, focus ring.
- **Files added:** `fonts.css`, `fonts.ts`, `vars.css`, `vars.ts` — all in `source/styles/`.

### Components Implemented (17 total)
Each component has 6 files: `.json`, `.structure.html`, `.css`, `.ts`, `.md`, `.test.ts`.

| Component | Tier | Category |
|---|---|---|
| Text | 1 | Typography |
| Title | 1 | Typography |
| Space | 1 | Layout |
| Divider | 1 | Layout |
| Stack | 1 | Layout |
| Group | 1 | Layout |
| Badge | 1 | Data Display |
| Paper | 1 | Surface |
| Button | 1 | Button (pre-existing) |
| ActionIcon | 1 | Button |
| Checkbox | 1 | Input |
| Switch | 1 | Input |
| TextInput | 1 | Input |
| Alert | 2 | Feedback |
| Loader | 1 | Feedback |
| Skeleton | 1 | Feedback |
| Tooltip | 2 | Overlay |

### Quality Gates
- **Typecheck:** Clean (0 errors) with `bun run typecheck`.
- **Tests:** 268/268 passing across 63 test files.
- **Remaining:** 53 components left from TODO.md inventory (114 total, 61 implemented).

### Mantine Reference Architecture
- Mantine source available at `.ignored/mantine/packages/@mantine/core/src/components/`.
- Pattern observed: `varsResolver` maps props → CSS vars, CSS Modules consume them, `polymorphicFactory` enables composition.
- Suraia translates this to framework-agnostic blueprints using data attributes (`data-suraia-*`) and CSS custom properties.

### Owner Preferences
- Primary color: **violet** (#7950f2), secondary: agent choice (blue-gray).
- Radius, spacing: based on Mantine defaults.
- **Directive:** "Implement as many components as you can without my help."
- For complex components requiring non-obvious strategies, write a `/docs` document.

## 2026-05-25 (Session 2) — Primitive & Layout Components Implementation Sprint
- **Implemented Components Batch A:** Box, Center, AspectRatio, UnstyledButton, VisuallyHidden, Card, Kbd, Mark, Highlight (each with spec, anatomy structure, css, controller, test, and md guide).
- **Implemented Components Batch B:** SimpleGrid, AppShell, CopyButton, FileButton, NativeSelect, Fieldset, PinInput, FileInput, Chip (each with spec, structure, css, controller, test, and md guide).
- **Bug Fix:** Fixed precision rounding issue in `NumberInputController` where standard floating-point representation boundaries led to failing tests for rounding up values like 1.005. Resolved using `Math.round` and `Number.EPSILON`.
- **Progress:** Audited all component blueprints, reaching 61/114 components total (54%) with 268 passing tests.

