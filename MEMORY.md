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

## 2026-05-26 01:37 +02:00 - Component Inventory Completion Sprint
- **Completed TODO component inventory:** All 111 component inventory entries in `TODO.md` now have complete blueprint folders under `suraia/source/components/`.
- **New components added:** ColorInput, ColorPicker, JsonInput, MaskInput, Stepper, FloatingIndicator, FloatingWindow, Spoiler, List, Scroller, Transition.
- **Missing test restored:** Added `scroll-area.test.ts` so ScrollArea has the full six-file blueprint contract.
- **Bug fixes:** Fixed FocusTrap Bun DOM test shim, Marquee speed-to-duration math, NumberFormatter percent precision, RollingNumber negative zero offset, and Typography test index-signature access.
- **TODO status updated:** Component inventory checkboxes are all marked complete. The unrelated top-level TODO items (`Explore naive-ui`, `Add utilities`, `Work on CLI`) remain open.
- **Tooling fix:** `package.json` `typecheck` and `build` scripts now run TypeScript through `bunx --bun tsc` to avoid the broken local Bun `.bin/tsc` remap on Windows.
- **Verification:** `bun test` passed after build with 976 tests across source and library outputs. `bun run typecheck` passed. `bun run build` passed.

## 2026-05-26 - Working Example Apps
- **Vanilla example implemented:** `example/vanilla` is a Bun-native Vanilla TypeScript app using `src/server.ts`, `index.html`, `src/main.ts`, and local generated-style CSS. It demonstrates overview, generator, components, and instructions pages with loading, empty, success, error, form, toast, progress, tab, theme, and dialog states. Default dev port: `4101`.
- **React example implemented:** `example/react` mirrors Bun's React template with `src/index.ts` server, `src/frontend.tsx` browser entry, `src/App.tsx` generated local TSX components, and `src/index.html` static build entry. Default dev port: `4102`.
- **Usage docs added:** `docs/2026-05-26-using-suraia-with-vanilla-react-arrow-remix.md`, `example/README.md`, `example/vanilla/README.md`, `example/react/README.md`, `example/arrow-js/README.md`, and `example/remix/README.md`.
- **Later targets documented:** Arrow.js should map blueprints to Arrow templates/reactivity. Remix SQL generation should map blueprints to route modules, loaders/actions, and typed SQL scaffolds after UI dependency resolution.
- **Verification:** `bun run typecheck` and `bun run build` passed for both `example/vanilla` and `example/react`. Runtime smoke checks succeeded on `http://127.0.0.1:4101` and `http://127.0.0.1:4102`, including `/api/blueprints` responses.

## 2026-05-28 23:40 +02:00 - Blueprint Preview Tooling Recommendation
- Evaluated documentation and preview options for Suraia's 111 framework-agnostic component blueprints.
- Current `.storybook/` is effectively empty; existing `example/vanilla` and `example/react` apps are target-consumption demos, not an exhaustive blueprint workbench.
- Recommended direction: build a Suraia-native Blueprint Workbench first, likely Bun/Vite-powered, that reads `suraia/source/components/**` directly and renders `.structure.html`, `.css`, `.json`, `.md`, and controller metadata with generated variant/state previews.
- Recommended secondary layer: add Storybook later as a publication/testing shell around the same generated preview registry, using the HTML or Web Components/Vite framework rather than a React-only setup.
- Recommendation rationale: Suraia's source of truth is not React/Vue/etc.; preview tooling should validate the blueprint contract itself before validating generated framework adapters.

## 2026-05-28 23:50 +02:00 - ClickUp Preview Tooling Tasks
- Created ClickUp tasks in the GUIHO Suraia list (`901523550736`) for the preview/documentation roadmap:
  - `86ca12da7` - Build Suraia Blueprint Workbench - priority urgent - https://app.clickup.com/t/86ca12da7
  - `86ca12dbc` - Add Storybook Web Components/Vite Preview Layer - priority high - https://app.clickup.com/t/86ca12dbc
  - `86ca12dby` - Implement VitePress Documentation Site - priority normal - https://app.clickup.com/t/86ca12dby
- Next intended implementation task: start with `86ca12da7` and build the Blueprint Workbench before Storybook or VitePress.

## 2026-05-28 23:48 +02:00 - React Example Bun HMR Fix
- Fixed `example/react/src/frontend.tsx` so React root reuse accesses `import.meta.hot.data.root` directly instead of storing `import.meta.hot.data` in an intermediate variable.
- Rationale: Bun 1.3.14 rejects indirect HMR API/data access in browser bundles with `import.meta.hot.data cannot be used indirectly`.
- Verification: `bun run typecheck` passed in `example/react`; headless Chrome rendered `http://localhost:4102/` successfully through the existing Bun dev server.

## 2026-05-29 00:02 +02:00 - React Blueprint Conversion Instruction Draft
- Created `docs/2026-05-28-react-blueprint-conversion-instructions.md` as the working draft for converting Suraia blueprints into local React components.
- Captured owner direction that generated Suraia components must live in a library-owned local namespace such as `app/suraira/suraira-button.tsx` or `src/suraira/suraira-button.tsx`, not as inline `GeneratedButton` functions inside `App.tsx` and not primarily under a generic `components/` directory.
- Captured the first operational step: locate `@guiho/suraia` in the target app's `package.json` and `node_modules`, verify `library/components/<component>/` or local-source fallback paths, ask before running `bun add -d @guiho/suraia`, and stop with an explicit report if verification repeatedly fails.
- Current `example/react` status noted in the draft: `@guiho/suraia` is not listed in `example/react/package.json`, and `example/react/node_modules/@guiho/suraia` is absent. No install was run.

## 2026-05-29 00:14 +02:00 - Suaira Config TOML Contract Draft
- Created `docs/2026-05-29-suaira-config-toml.md` documenting the first TOML configuration contract for blueprint conversion.
- The config filename is currently documented exactly as specified by the owner: `suaira.config.toml`.
- The config file must live beside the target app's `package.json`; that directory is the package scope and relative config paths resolve from there.
- Documented `[paths].read` with default `node_modules/@guiho/suraia`, checking `library/components/<component>/` first and `source/components/<component>/` as a fallback for linked/local package layouts.
- Documented `[paths].write` as the final local Suraia-owned output directory. If omitted, default to `source/suraira` when `source/` exists, else `src/suraira` when `src/` exists, else `suraira` beside the config.
- Updated the React conversion instructions so the process starts by loading `suaira.config.toml`, then ensures the library is installed, then verifies the local component output path before writing React files.
- Current `example/react` status: `suaira.config.toml` is absent, `src/` exists, and the default write directory would be `example/react/src/suraira/`.

## 2026-05-29 00:27 +02:00 - React Conversion General Verification Update
- Updated `docs/2026-05-29-suaira-config-toml.md` so missing `suaira.config.toml` no longer blocks the workflow. The assistant should tell the user it is creating a default config, create it beside `package.json`, and continue.
- Updated `docs/2026-05-28-react-blueprint-conversion-instructions.md` so Step 3 is now general project verification, not only output-path verification.
- Documented preferred generated-component import alias: `#suraia/*`, mapped to the resolved local write directory, such as `"#suraia/*": ["./src/suraira/*"]`.
- If `tsconfig.json` exists, the assistant should inspect `compilerOptions.paths`, preserve existing aliases, and add `#suraia/*` when missing. If `tsconfig.json` is absent, use the project's existing import mechanism when available, otherwise fall back to relative imports.
- Current `example/react/tsconfig.json` has `@/*` mapped to `./src/*` but does not yet have `#suraia/*`; the matching alias would be `"#suraia/*": ["./src/suraira/*"]`.

## 2026-05-29 00:33 +02:00 - React Example Config And Alias Applied
- Applied the new workflow defaults to `example/react`: added `suaira.config.toml` with `[paths] read = "node_modules/@guiho/suraia"` and `write = "src/suraira"`.
- Added `"#suraia/*": ["./src/suraira/*"]` to `example/react/tsconfig.json` while preserving the existing `"@/*": ["./src/*"]` alias.
- Added `@guiho/suraia` to `example/react/package.json` as a local file devDependency: `"file:../../suraia"`, and updated `example/react/bun.lock`.
- `bun install` for the local file dependency currently fails with `EPERM: failed copying files from cache to destination for package @guiho/suraia`; using `link:../../suraia` also failed because Bun could not link the local package. The workspace `node_modules/@guiho/suraia` was manually populated from `suraia/package.json`, `jsr.json`, `CHANGELOG.md`, `LICENSE.md`, `library/`, and `docs/` so the current example can resolve the blueprint read path.
- Verification: `example/react/node_modules/@guiho/suraia/library/components/button/` is present, `bun run typecheck` passes in `example/react`, and `bun run build` passes when run outside the sandbox after sandboxed node_modules reads hit EPERM.

## 2026-05-29 00:36 +02:00 - Blueprint Workbench Implementation Prompt
- Prepared a detailed single-task handoff prompt for another AI to implement the Suraia Blueprint Workbench.
- The prompt directs the implementer to build a Bun + Vite + Vanilla TypeScript workbench inside `suraia/preview/`, generate a blueprint registry from `source/components/*`, render `.structure.html` plus component CSS/tokens, auto-generate controls from `.json`, and verify with Bun typecheck/build plus browser smoke testing.
- Current repository facts used by the prompt: 111 component directories, 666 component blueprint files, strict TypeScript settings, and no existing framework adapters.

## 2026-05-29 00:42 +02:00 - Generated React Component Naming Rules
- Added generated React component rules to `AGENTS.md` and mirrored them in the React conversion/config docs.
- Generated React conversion must create two files per component in the resolved write directory: `suraia-<component-slug>.tsx` and `suraia-<component-slug>.modules.css`.
- Generated React component symbols use the `Suraia` PascalCase prefix, e.g. `suraia-component-log-name.tsx` exports `SuraiaComponentLogName`.
- Generated `.tsx` files must be ordered as imports, then top export block, then implementation. Do not inline exports on function/const declarations.
- Generated components import their CSS module as `classes`, define props as `interface Props`, use a TypeScript `function` declaration, and import other generated Suraia components through the configured `#suraia/*` alias.

## 2026-05-29 00:47 +02:00 - React Conversion Existing Output Rule
- Added idempotency/override rules to `AGENTS.md`, `docs/2026-05-28-react-blueprint-conversion-instructions.md`, and `docs/2026-05-29-suaira-config-toml.md`.
- Before generating a React component, check whether `suraia-<component-slug>.tsx` and `suraia-<component-slug>.modules.css` already exist in the resolved write directory.
- If both exist and the user did not explicitly request override/overwrite/regeneration, report that the component is already written in React and stop for that component.
- If only one expected file exists, treat it as a partial existing conversion and stop unless override/overwrite/regeneration was explicitly requested.
- If override/overwrite/regeneration is explicitly requested, overwrite both generated files.
- Existing dependency components should be imported through `#suraia/*` instead of regenerated.

## 2026-05-29 01:00 +02:00 — Suraia Blueprint Workbench Implementation

### Workbench Built
- Created `suraia/preview/` — a Bun + Vite + Vanilla TypeScript local workbench app that previews all 111 blueprint components directly from their source files in `source/components/`.
- No framework adapters (React, Vue, Svelte, Web Components) were used. The workbench uses pure DOM APIs and vanilla TypeScript.

### Files Created (18 files)
```
preview/
  index.html                          Entry HTML
  vite.config.ts                      Vite configuration (root: preview/, fs.allow for source/)
  tsconfig.json                       TypeScript config (DOM lib, vite/client types)
  source/
    main.ts                           DOMContentLoaded entry → initApp()
    app.ts                            App shell: hash routing, sidebar, component page rendering
    styles/workbench.css              Dense utilitarian workbench UI (sidebar, panels, tabs, matrix)
    blueprints/types.ts               BlueprintRecord, ComponentSpec, CategoryMap types
    blueprints/load-blueprints.ts     import.meta.glob loader for all 111 × 6 component files
    blueprints/normalize-blueprint.ts JSON spec parser + six-file contract validator
    blueprints/categories.ts          Slug → category mapping from TODO.md inventory
    preview/render-preview.ts         iframe srcdoc renderer (tokens + component CSS + slot replacement)
    preview/apply-controls.ts         ControlState builder from JSON spec (variants/states/attributes)
    preview/render-matrix.ts          Variant/state/dark mode matrix generator (cap: 24 cells)
    ui/sidebar.ts                     Left sidebar: search, category grouping, tier badge, warning indicator
    ui/component-page.ts              Main view: header, preview canvas, tab bar, controls, deps
    ui/controls-panel.ts              Auto-generated controls from JSON spec (selects, toggles, inputs)
    ui/code-panel.ts                  8-tab panel: Preview, Matrix, Structure, Spec, Styles, Behavior, Guide, Tests
    ui/dependency-panel.ts            Dependency list with exists/missing status and click navigation
```

### Package Scripts Added
```json
"preview": "vite --config preview/vite.config.ts",
"preview:build": "vite build --config preview/vite.config.ts",
"preview:typecheck": "bunx --bun tsc -p preview/tsconfig.json --noEmit"
```

### Key Implementation Details
- Vite `import.meta.glob` with `eager: true, query: '?raw'` loads all component source files at build time (689 modules, 920KB JS bundle).
- Glob paths use `../../../source/components/*/*.json` — relative to `preview/source/blueprints/` going up to `suraia/source/components/`.
- Preview rendering uses `iframe srcdoc` with embedded token CSS + component CSS + slot placeholders.
- `<slot>` elements are replaced in-memory only (HTML source is not modified).
- Hash routing (`#/components/<slug>`) enables direct navigation without page reload.
- Light/dark theme switching via `data-suraia-color-scheme` attribute on the iframe body.
- Width controls for desktop/tablet/mobile preview sizes.
- Matrix view caps at 24 cells to avoid combinatorial explosion; shows truncation notice when cap is hit.

### Verification Results
| Check | Result |
|---|---|
| `bun run typecheck` | Clean (0 errors) |
| `bun run preview:typecheck` | Clean (0 errors) |
| `bun test` | 976/976 passing |
| `bun run preview:build` | Success (689 modules, 920KB JS, 7.9KB CSS) |
| 111 component folders | Confirmed |
| ClickUp task `86ca12da7` | Updated to "in progress" |

### Dependencies Added
- `vite` (devDependency, v8.0.14)

### Known Warnings
- Build chunk size warning (>500KB) — acceptable for a local workbench, can be optimized with code splitting later.
- No browser automation available for smoke testing; the build output and typecheck results serve as verification.
