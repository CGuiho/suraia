# 🌻 GUIHO Suraia — Architecture Specification (AI-First UI Blueprint)

**npm package:** `@guiho/suraia`  
**CSS Prefix:** `x40-suraia-`


## 1. Vision & Core Philosophy

**GUIHO Suraia** is an **AI-first UI blueprint library**. It is not a React component library, Svelte library, Vue library, or a Web Components library. Instead, Suraia stores the neutral, framework-agnostic knowledge required to describe UI components so that developer-facing AI assistants can translate and generate them directly into target applications.

The core principle is:
> A component should have one source of truth: its structural anatomy, styling constraints, interactive behavior logic, and accessibility contract. Framework-specific implementation is an output generated locally, not a foundation we distribute.

> [!NOTE]
> For the full library philosophy — including the blueprint-not-component model, AI-as-compiler consumption workflow, dependency resolution contract, component complexity tiers, and long-term vision — see **`docs/2026-05-25-philosophy.md`**.


## 2. Consumption Model (How it is Used)

### 2.1 devDependency-Only Architecture
Suraia is designed specifically for **AI-augmented development workflows**:

1. **Install as devDependency:** The package `@guiho/suraia` is added to a project's `devDependencies`. It is never bundled into production code.
2. **Zero Production Runtime Footprint:** No runtime code from suraia is imported in the production application bundle.
3. **Local Code Generation:** An AI assistant (or compiler tool) reads the blueprints, styling specs, behavior scripts, and translation prompts from the `@guiho/suraia` package. It compiles, generates, and places the final components (e.g., React JSX files, Svelte files, Vue SFCs) and custom stylesheet files directly into the target project's codebase. The developer has full local ownership and customization of the generated components.
### 2.2 Styling Paradigms (CSS, JS/TS, and Hybrid)
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

Our proof of concept targets five core components:

| Component | Goal |
| :--- | :--- |
| **Button** | Variant mappings, states (disabled, loading), keyboard enter/space support, and label/icon slotting. |
| **Input** | Validation, error boundaries, floating labels, and form behaviors. |
| **Card** | Layout patterns, structural slots, static visual grouping. |
| **Badge** | Static metadata indicator for variant, tone, and size testing. |
| **Dialog** | Portal mounting, overlay control, focus trapping, and escape key handling. |
