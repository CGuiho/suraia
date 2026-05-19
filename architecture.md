# 🌻 suraia — Architecture Specification (AI-First UI Blueprint)

**npm package:** `@guiho/suraia`  
**CSS Prefix:** `x40-sui-`

---

## 1. Vision & Core Philosophy

**suraia** is an **AI-first UI blueprint library**. It is not a React component library, Svelte library, Vue library, or a Web Components library. Instead, suraia stores the neutral, framework-agnostic knowledge required to describe UI components so that developer-facing AI assistants can translate and generate them directly into target applications.

The core principle is:
> A component should have one source of truth: its structural anatomy, styling constraints, interactive behavior logic, and accessibility contract. Framework-specific implementation is an output generated locally, not a foundation we distribute.

---

## 2. Consumption Model (How it is Used)

### 2.1 devDependency-Only Architecture
suraia is designed specifically for **AI-augmented development workflows**:

1. **Install as devDependency:** The package `@guiho/suraia` is added to a project's `devDependencies`. It is never bundled into production code.
2. **Zero Production Runtime Footprint:** No runtime code from suraia is imported in the production application bundle.
3. **Local Code Generation:** An AI assistant (or compiler tool) reads the blueprints, styling specs, behavior scripts, and translation prompts from the `@guiho/suraia` package. It compiles, generates, and places the final components (e.g., React JSX files, Svelte files, Vue SFCs) and custom stylesheet files directly into the target project's codebase. The developer has full local ownership and customization of the generated components.

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
* **Base Styles (`base-tokens.css`):** Maps the token registry to standard CSS custom properties under `:root` (e.g. `--sui-color-brand-primary`, `--sui-space-4`).
* **Visual Profiles (`profiles/`):** Scoped sheets overriding base tokens to change the visual identity (e.g. Apple-like subtle borders, Material-like pill-shaped controls).
  ```html
  <body data-sui-profile="apple-like">
  ```

### 3.2 Component Blueprints (`source/components/`)
Each component is represented by a folder containing:
* **`[name].json` (Specification):** Machine-readable JSON describing structural slots, variants, states, attributes, and accessibility configurations.
* **`[name].structure.html` (Markup Anatomy):** Fully semantic HTML skeleton showing standard classes and `data-sui-*` properties.
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
* **CSS Variable Prefix:** `--sui-`
* **CSS Classname Prefix:** `.sui-`
* **HTML Component Attributes:** `data-sui-component`, `data-sui-variant`, `data-sui-tone`, `data-sui-size`, `data-sui-state`

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
