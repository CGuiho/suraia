# 🌻 GUIHO Suraia — Architecture Specification (AI-First UI Blueprint)

**npm package:** `@guiho/suraia`  
**CSS Prefix:** `x40-suraia-`


## 1. Vision & Core Philosophy

**GUIHO Suraia** is an **AI-first UI blueprint library**. It is not a React component library, Svelte library, Vue library, or a Web Components library. Instead, Suraia stores the neutral, framework-agnostic knowledge required to describe UI components so that developer-facing AI assistants can translate and generate them directly into target applications.

The core principle is:
> A component should have one source of truth: its structural anatomy, styling constraints, interactive behavior logic, and accessibility contract. Framework-specific implementation is an output generated locally, not a foundation we distribute.

> [!NOTE]
> For the full library philosophy — including the blueprint-not-component model, AI-as-compiler consumption workflow, dependency resolution contract, component complexity tiers, and long-term vision — see **`PHILOSOPHY.md`**.


## 2. Consumption Model (How it is Used)

### 2.1 devDependency-Only Architecture
Suraia is designed specifically for **AI-augmented development workflows**:

1. **Install as devDependency:** The package `@guiho/suraia` is added to a project's `devDependencies`. It is never bundled into production code.
2. **Zero Production Runtime Footprint:** No runtime code from suraia is imported in the production application bundle.
3. **Local Code Generation:** An AI assistant (or compiler tool) reads the blueprints, styling specs, behavior scripts, and translation prompts from the `@guiho/suraia` package. It compiles, generates, and places the final components (e.g., React JSX files, Svelte files, Vue SFCs) and custom stylesheet files directly into the target project's codebase. The developer has full local ownership and customization of the generated components.

### 2.2 Technology Agnosticism
The same blueprint generates different outputs depending on the developer's technology stack. The AI reads the blueprint once and produces framework-idiomatic code:

| Developer's Stack | AI Generates |
| :--- | :--- |
| **React** | `.tsx` component + CSS Modules or styled-components |
| **Vue 3** | `.vue` Single File Component with `<style scoped>` |
| **Svelte** | `.svelte` component with scoped styles |
| **Angular** | `.component.ts` + `.component.html` + `.component.css` |
| **Vanilla JS** | Plain `.js` module + `.css` file |
| **Solid** | `.tsx` component with Solid's reactive primitives |
| **Lit** | Web Component class with Shadow DOM styles |

The design intent is identical across all targets. The button looks the same, behaves the same, meets the same accessibility standards, and uses the same design tokens. Only the syntax changes. **One design system, every framework.**

### 2.3 Styling Paradigms (CSS, JS/TS, and Hybrid)
suraia supports three main styling approaches:

1. **Full CSS Styling (Recommended):** The generated components reference standard CSS classes (e.g., `.suraia-button`) and CSS custom properties (e.g., `var(--suraia-color-primary)`). This is highly performant and allows instant theme/profile switching in the browser.
2. **Full JavaScript/TypeScript Styling:** Tokens and layouts are imported and applied entirely as JS/TS objects (e.g., for inline styles, CSS-in-JS, or build-time styles). To support this, everything defined in suraia's CSS stylesheets is also exported as structured TypeScript constants.
3. **Hybrid Styling:** A mix where structural layout is declared in static CSS sheets, while dynamic styles or layout behaviors are computed in JS/TS.

> [!NOTE]
> Base styles (like global resets, token custom variable fallbacks) remain CSS files that users import directly.

---

## 3. System Layers

suraia is organized into four main layers:

```txt
┌────────────────────────────────────────────────────────┐
│                     1. Themes                          │
│   (JSON design tokens & scoped CSS variables)          │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                  2. Component Specs                    │
│   (Anatomy, states, variants & markup blueprints)      │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                 3. Behavior Controllers                 │
│   (Framework-agnostic interaction JS/TS engines)       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                   4. Prompt Guides                     │
│   (Markdown templates for AI code generation)          │
└────────────────────────────────────────────────────────┘
```

### 3.1 Design Tokens & Themes
* **Design Tokens (`tokens.json`):** Hierarchical tokens organized using the Design Tokens Community Group (DTCG) specification (defining colors, spacing, radius, fonts, shadows, transitions). This registry is the machine-readable truth of the styling system.
* **Base Styles (`base-tokens.css`):** Maps the token registry to standard CSS custom properties under `:root` (e.g. `--suraia-color-brand-primary`, `--suraia-space-4`).
* **Visual Profiles (`profiles/`):** Scoped sheets overriding base tokens to change the visual identity (e.g. Apple-like subtle borders, Material-like pill-shaped controls).
  ```html
  <body data-suraia-profile="apple-like">
  ```

### 3.2 Component Blueprints (`source/components/`)
Each component is represented by a folder containing:
* **`[name].json` (Specification):** Machine-readable JSON describing structural slots, variants, states, attributes, and accessibility configurations.
* **`[name].structure.html` (Markup Anatomy):** Fully semantic HTML skeleton showing standard classes and `data-suraia-*` properties.
* **`[name].css` (Layout Styles):** Theme-agnostic layout, flex/grid rules, and interactive transitions using CSS custom variables.

### 3.3 Behavior Controllers
* Written as framework-independent TypeScript modules (`[name].ts`).
* Enforces interaction states, event lifecycle management, and keyboard focus contracts.
* Serves as a reference implementation or can be wrapped directly by framework-specific code.

### 3.4 Prompt Guides (`source/prompts/`)
* Detailed markdown system instructions (e.g. `react.md`, `vue.md`, `svelte.md`) that guide code-generating LLMs on how to read a suraia blueprint and write clean, accessible, framework-idiomatic component wrappers.

---

## 4. Repository Directory Structure

The project structure is centered around the main `suraia` package:

```txt
suraia/
  package.json
  tsconfig.json
  source/
    themes/
      tokens.json          # Machine-readable token registry
      base-tokens.css      # Core variable mapping
      profiles/
        apple-like.css     # Apple design override
        material-like.css  # Material design override
        suraia-default.css # Default visual system skin
    styles/
      colors.css / .ts     # General-purpose visual color palette
      fonts.css / .ts      # Google Sans & Fira Sans typography configurations
      vars.css / .ts       # Global layout units & base dimensions
      reset.css            # Standard global HTML reset styles
      general.css          # Core container settings & scrollbar rules
    components/
      button/
        button.json        # Button anatomy spec
        button.structure.html # Button reference HTML
        button.css         # Button layout styles
        button.ts          # Button behavior controller logic
        button.prompt.md   # Button translation instructions
      input/
      card/
      badge/
      dialog/
    prompts/
      react.md             # React translation instructions
      vue.md               # Vue translation instructions
      svelte.md            # Svelte translation instructions
      vanilla.md           # Vanilla JS translation instructions
```

---

## 5. Naming Conventions

* **Project Name:** `suraia`
* **NPM Package:** `@guiho/suraia`
* **CSS Variable Prefix:** `--suraia-`
* **CSS Classname Prefix:** `.suraia-`
* **HTML Component Attributes:** `data-suraia-component`, `data-suraia-variant`, `data-suraia-tone`, `data-suraia-size`, `data-suraia-state`

---

## 6. Initial MVP Components

Our proof of concept targets five core components (all Tier 1 Primitives except Dialog, which is Tier 2):

| Component | Tier | Goal |
| :--- | :--- | :--- |
| **Button** | 1 — Primitive | Variant mappings, states (disabled, loading), keyboard enter/space support, and label/icon slotting. |
| **Input** | 1 — Primitive | Validation, error boundaries, floating labels, and form behaviors. |
| **Card** | 1 — Primitive | Layout patterns, structural slots, static visual grouping. |
| **Badge** | 1 — Primitive | Static metadata indicator for variant, tone, and size testing. |
| **Dialog** | 2 — Composite | Portal mounting, overlay control, focus trapping, and escape key handling. Depends on Button. |

---

## 7. Component Complexity Tiers

Blueprints are organized into four tiers of increasing complexity. Each tier builds on the previous one, and the dependency chain must be resolved in order.

### Tier 1 — Primitives
The atomic building blocks. These have **no dependencies** on other Suraia components.

* Button, Icon Button
* Text Input, Textarea
* Badge, Tag, Chip
* Label, Caption
* Divider, Spacer
* Card

### Tier 2 — Composites
Components that combine multiple primitives. These **declare dependencies** on Tier 1 blueprints.

* Dialog (uses Button for actions, overlay behavior)
* Drawer (uses Button for close, overlay behavior)
* Dropdown / Select (uses Input for trigger, list for options)
* Autocomplete / Combobox (uses Input, list, filtering logic)
* Tooltip, Popover
* Tabs, Accordion

### Tier 3 — Patterns
Full UI patterns composed of multiple Tier 1 and Tier 2 components.

* App Shell (navigation rail/sidebar + header + content area)
* Hero Section (heading + subtitle + CTA buttons + background)
* Form Layout (labeled inputs + validation + submit)
* Data Table (headers + rows + sorting + pagination)
* Card Grid / Masonry Layout

### Tier 4 — Pages
Complete page blueprints that assemble patterns into full screens.

* Landing Page
* Authentication Flow (login + registration + password reset)
* Dashboard Layout
* Settings Page
* Error Pages (404, 500)

---

## 8. Dependency Resolution Contract

When a developer asks their AI assistant to generate a component, the AI must follow this protocol:

1. **Read the blueprint** for the requested component.
2. **Identify its dependencies** — which other Suraia blueprints it requires (declared in the component's `.json` specification).
3. **Check the developer's project** — have those dependencies already been generated locally?
4. **Generate missing dependencies first**, in dependency order (Tier 1 before Tier 2 before Tier 3).
5. **Then generate the requested component**, importing the already-generated dependencies from the project's local paths.

Example — the developer asks for a Dialog:

```txt
Dialog blueprint declares dependencies:
  → Button (for action buttons: confirm, cancel)
  → IconButton (for close button)
  → Overlay (for backdrop)

AI checks the project:
  ✓ Button already exists at src/components/button/Button.tsx
  ✗ IconButton does not exist
  ✗ Overlay does not exist

AI generates in order:
  1. IconButton  → src/components/icon-button/IconButton.tsx
  2. Overlay     → src/components/overlay/Overlay.tsx
  3. Dialog      → src/components/dialog/Dialog.tsx
     (imports Button, IconButton, and Overlay from local paths)
```

This ensures that complex components are always built on top of locally-owned, already-generated primitives — never on external runtime dependencies.

---

## 9. What Suraia Is Not

* **Not a runtime library.** It is never imported in production code.
* **Not a component library.** It does not ship framework-specific components.
* **Not a CSS framework.** It provides design tokens and component-scoped styles, not utility classes.
* **Not a design tool.** It does not replace Figma or Sketch. It is the engineering counterpart to design files.
* **Not a code generator CLI.** The generation is performed by AI assistants, not by a bespoke CLI tool (though a CLI could be built on top of the blueprints in the future).

---

## 10. Long-Term Vision

Today, Suraia provides blueprints for individual components. The roadmap extends to:

1. **Complex compositions** — Hero sections, app shells, full page layouts, all described as blueprints with dependency chains.
2. **Visual profiles** — Apple-like, Material-like, custom brand profiles that reskin every component through token overrides.
3. **Interaction patterns** — Drag-and-drop, virtualized lists, infinite scroll, all as behavior blueprints.
4. **Full application scaffolds** — Complete application skeletons (dashboard app, e-commerce storefront, SaaS admin) as Tier 4 blueprints.
5. **Multi-platform** — Extend beyond web to React Native, Flutter, SwiftUI, and Kotlin Compose through platform-specific prompt guides.

The ambition: **one blueprint library that describes every UI component, pattern, and page a developer will ever need — and AI generates it in whatever technology they choose.**
