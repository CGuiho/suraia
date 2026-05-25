# 🌻 GUIHO Suraia — Philosophy

**Package:** `@guiho/suraia`
**Document:** Philosophy & Vision
**Date:** 2026-05-25

---

## 1. The Problem: Framework Lock-In

Modern UI development is fractured. A team building with React owns React components. A team building with Vue owns Vue components. A team building with Angular owns Angular components. The design intent — the structure, the styling, the interaction model, the accessibility contract — is identical across all of them. Yet every team rewrites everything from scratch, locked into their framework's idioms.

When a company changes frameworks, or a developer starts a new project with a different stack, all of that UI work is abandoned. The knowledge is trapped in framework-specific syntax.

**Suraia rejects this.**

---

## 2. The Core Idea: Blueprints, Not Components

Suraia is not a component library. It does not ship React components, Vue components, Svelte components, Web Components, or any other framework-bound code. It ships **blueprints**.

A blueprint is the complete, framework-agnostic description of a UI component:

- **Structure** — The semantic HTML skeleton, slot positions, and element hierarchy.
- **Styling** — The layout rules, spacing, colors, typography, transitions, and responsive behavior, expressed as CSS with design tokens.
- **Behavior** — The interaction logic: what happens on click, on focus, on keyboard input, on state change. Written as framework-independent TypeScript.
- **Specification** — The machine-readable contract: variants, states, sizes, tones, accessibility attributes, and ARIA roles. Stored as JSON.
- **Prompt Guide** — The AI-facing instructions that teach a code-generating LLM how to translate this blueprint into a specific framework.

A blueprint is **one source of truth**. Framework-specific code is an **output**, not a source.

---

## 3. The Consumption Model: AI as the Compiler

Traditional UI libraries are consumed by importing and rendering components at runtime:

```tsx
// Traditional: runtime dependency, framework lock-in
import { Button } from '@some-library/react';
```

Suraia is consumed completely differently. It is a **devDependency only**. It is never imported in production code. Instead, an AI assistant reads the blueprints and generates native components directly into the developer's project:

```
┌─────────────────────────────────────────────────────────────┐
│  Developer's Project (e.g., React app)                      │
│                                                             │
│  1. Install:  bun add -D @guiho/suraia                      │
│                                                             │
│  2. AI reads:  node_modules/@guiho/suraia/                  │
│     └── source/components/button/                           │
│         ├── button.json           (specification)           │
│         ├── button.structure.html (anatomy)                 │
│         ├── button.css            (styling)                 │
│         ├── button.ts             (behavior controller)     │
│         └── button.md             (prompt guide)            │
│                                                             │
│  3. AI generates into the project:                          │
│     └── src/components/button/                              │
│         ├── Button.tsx            (React component)         │
│         └── Button.module.css     (CSS Module styles)       │
│                                                             │
│  4. Developer uses the generated component:                 │
│     import { Button } from './components/button/Button';    │
│                                                             │
│  5. Zero runtime dependency on @guiho/suraia.               │
└─────────────────────────────────────────────────────────────┘
```

The generated component is **owned by the developer**. It lives in their codebase, it is committed to their repository, and it can be customized freely. Suraia is the blueprint; the developer's project contains the building.

---

## 4. Technology Agnosticism

The same blueprint generates different outputs depending on the developer's technology stack:

| Developer's Stack | AI Generates |
|---|---|
| React | `.tsx` component + CSS Modules or styled-components |
| Vue 3 | `.vue` Single File Component with `<style scoped>` |
| Svelte | `.svelte` component with scoped styles |
| Angular | `.component.ts` + `.component.html` + `.component.css` |
| Vanilla JS | Plain `.js` module + `.css` file |
| Solid | `.tsx` component with Solid's reactive primitives |
| Lit | Web Component class with Shadow DOM styles |

The **design intent is identical** across all of these. The button looks the same, behaves the same, meets the same accessibility standards, uses the same design tokens. Only the syntax changes.

This is the fundamental value proposition: **one design system, every framework**.

---

## 5. Component Complexity Tiers

Suraia blueprints are organized into tiers of increasing complexity:

### Tier 1 — Primitives
The atomic building blocks. These have no dependencies on other Suraia components.

- Button, Icon Button
- Text Input, Textarea
- Badge, Tag, Chip
- Label, Caption
- Divider, Spacer

### Tier 2 — Composites
Components that combine multiple primitives. These declare **dependencies** on Tier 1 blueprints.

- Dialog (uses Button for actions, uses overlay behavior)
- Drawer (uses Button for close, uses overlay behavior)
- Dropdown / Select (uses Input for trigger, uses list for options)
- Autocomplete / Combobox (uses Input, uses list, uses filtering logic)
- Tooltip, Popover
- Tabs, Accordion

### Tier 3 — Patterns
Full UI patterns composed of multiple Tier 1 and Tier 2 components.

- App Shell (navigation rail/sidebar + header + content area)
- Hero Section (heading + subtitle + CTA buttons + background)
- Form Layout (labeled inputs + validation + submit)
- Data Table (headers + rows + sorting + pagination)
- Card Grid / Masonry Layout

### Tier 4 — Pages
Complete page blueprints that assemble patterns into full screens.

- Landing Page
- Authentication Flow (login + registration + password reset)
- Dashboard Layout
- Settings Page
- Error Pages (404, 500)

Each tier builds on the previous one. A Tier 3 Hero Section depends on Tier 1 Button. A Tier 4 Landing Page depends on Tier 3 Hero Section, which depends on Tier 1 Button. The dependency chain must be resolved in order.

---

## 6. The Dependency Resolution Contract

This is a critical principle. When a developer asks their AI assistant to generate a complex component, the AI must:

1. **Read the blueprint** for the requested component.
2. **Identify its dependencies** — which other Suraia blueprints it requires.
3. **Check the developer's project** — have those dependencies already been generated?
4. **Generate missing dependencies first**, in dependency order.
5. **Then generate the requested component**, referencing the already-generated dependencies using the project's local import paths.

Example: The developer asks for a Dialog component.

```
Dialog blueprint declares dependencies:
  → Button (for action buttons: confirm, cancel)
  → IconButton (for close button)
  → Overlay (for backdrop)

AI checks the project:
  ✓ Button already exists at src/components/button/Button.tsx
  ✗ IconButton does not exist
  ✗ Overlay does not exist

AI generates:
  1. IconButton → src/components/icon-button/IconButton.tsx
  2. Overlay → src/components/overlay/Overlay.tsx
  3. Dialog → src/components/dialog/Dialog.tsx
     (imports Button, IconButton, and Overlay from local paths)
```

This ensures that complex components are always built on top of locally-owned, already-generated primitives — never on external runtime dependencies.

---

## 7. Why This Matters

### 7.1 No Framework Lock-In
Switch from React to Vue? The blueprints remain the same. Regenerate the components in Vue. The design system, the behavior, the accessibility — all preserved.

### 7.2 Full Developer Ownership
Generated code lives in the developer's repository. No black-box runtime. No version-pinning anxiety. No "the library updated and broke my app." The developer owns every line.

### 7.3 Zero Production Overhead
Suraia is a devDependency. It adds zero bytes to the production bundle. The generated components are native code — as lightweight as hand-written components.

### 7.4 AI-Native Workflow
Suraia is designed for the AI-augmented development era. The blueprints are structured for machine consumption: JSON specs for parsing, HTML skeletons for structure, CSS for styling, TypeScript for behavior, and Markdown prompt guides for natural-language instruction. Every file format is chosen for AI readability.

### 7.5 Design Consistency Across Projects
A company using Suraia can maintain one set of blueprints and deploy consistent UI across a React marketing site, a Vue dashboard, an Angular enterprise app, and a Svelte internal tool — all with the same look, feel, and behavior.

### 7.6 Future-Proof
When the next framework arrives (and it will), Suraia doesn't need to be rewritten. A new prompt guide is added, and the existing blueprints generate code for the new framework instantly. The design investment is permanent.

---

## 8. What Suraia Is Not

- **Not a runtime library.** It is never imported in production code.
- **Not a component library.** It does not ship framework-specific components.
- **Not a CSS framework.** It provides design tokens and component-scoped styles, not utility classes.
- **Not a design tool.** It does not replace Figma or Sketch. It is the engineering counterpart to design files.
- **Not a code generator CLI.** The generation is performed by AI assistants, not by a bespoke CLI tool (though a CLI could be built on top of the blueprints in the future).

---

## 9. The Long-Term Vision

Today, Suraia provides blueprints for individual components. Tomorrow:

1. **Complex compositions** — Hero sections, app shells, full page layouts, all described as blueprints with dependency chains.
2. **Visual profiles** — Apple-like, Material-like, custom brand profiles that reskin every component through token overrides.
3. **Interaction patterns** — Drag-and-drop, virtualized lists, infinite scroll, all as behavior blueprints.
4. **Full application scaffolds** — Complete application skeletons (dashboard app, e-commerce storefront, SaaS admin) as Tier 4 blueprints.
5. **Multi-platform** — Extend beyond web to React Native, Flutter, SwiftUI, and Kotlin Compose through platform-specific prompt guides.

The ambition is clear: **one blueprint library that describes every UI component, pattern, and page a developer will ever need — and AI generates it in whatever technology they choose.**

---

## 10. Summary

| Principle | Description |
|---|---|
| **Blueprint, not component** | Suraia describes components; it does not implement them in any framework. |
| **AI as compiler** | AI reads blueprints and generates native framework code. |
| **devDependency only** | Zero runtime footprint. Never shipped to production. |
| **Technology agnostic** | Same blueprint → React, Vue, Angular, Svelte, Vanilla, or anything else. |
| **Developer ownership** | Generated code is fully owned, committed, and customizable. |
| **Dependency resolution** | Complex components declare dependencies; AI resolves them in order. |
| **Design consistency** | One design system across every project and framework. |
| **Future-proof** | New frameworks only need a new prompt guide, not a rewrite. |
