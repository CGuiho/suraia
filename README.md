# GUIHO Suraira

**npm package:** `@guiho/suraira`

suraira is an AI-first UI blueprint library.

It is not primarily a React component library, a Remix component library, an ArrowJS component library, or a Web Components library. Instead, suraira is designed to store neutral UI component knowledge that can be translated into multiple environments by humans, AI coding agents, or future code generators.

The source of truth for each component should be its:

- HTML anatomy
- CSS classes
- CSS custom properties
- data attributes
- behavior controller
- accessibility contract
- framework translation guide

Framework-specific components are outputs, not the foundation.

---

## Vision

suraira should make it possible to define a component once and use that knowledge across:

- Vanilla HTML, CSS, and JavaScript
- ArrowJS
- Remix 3
- React
- optional Web Components

The project starts as a documentation and blueprint system. Later, it can evolve into packages, adapters, generators, examples, and runtime helpers.

---

## Core idea

Instead of creating separate implementations first:

```txt
ButtonReact.tsx
ButtonRemix.tsx
ButtonArrow.ts
ButtonWebComponent.ts
```

suraira starts with a neutral blueprint:

```txt
button/
  button.spec.ts
  button.structure.html
  button.styles.css
  button.behavior.ts
  button.accessibility.md
  button.ai.md
```

From this source, the project can produce:

```txt
React Button
Remix Button
ArrowJS Button
Vanilla HTML example
Web Component adapter
```

---

## Architecture

The full architecture is documented here:

```txt
docs/architecture.md
```

Main layers:

```txt
1. Design Profiles
2. Design Tokens
3. Component Blueprints
4. Behavior Controllers
5. Framework Adapters and AI Guides
```

The core principle is:

> Build the component knowledge once. Translate it everywhere.

---

## Naming

Project name:

```txt
suraira
```

npm package:

```txt
@guiho/suraira
```

Recommended CSS prefix:

```txt
sui
```

Examples:

```txt
.sui-button
.sui-card
.sui-input
--sui-color-primary
--sui-radius-md
data-sui-component
data-sui-variant
data-sui-tone
data-sui-size
```

---

## Initial MVP

The first proof of concept should focus on five components:

| Component | Purpose |
| --- | --- |
| Button | Variants, states, accessibility, basic behavior |
| Input | Labels, validation, errors, form behavior |
| Card | Layout, slots, styling-only structure |
| Badge | Small static component for token and variant testing |
| Dialog | Focus management, overlay behavior, keyboard accessibility |

The first serious component should be `Button`.

---

## Development phases

### Phase 1: Style system

Create base tokens and visual profiles:

```txt
tokens.css
profiles/suraira-default/tokens.css
profiles/material-like/tokens.css
profiles/apple-like/tokens.css
```

### Phase 2: Button blueprint

Create the first neutral component blueprint:

```txt
button.spec.ts
button.structure.html
button.styles.css
button.behavior.ts
button.accessibility.md
button.ai.md
```

### Phase 3: Manual adapters

Manually create examples for:

```txt
Vanilla
React
ArrowJS
Remix 3
```

### Phase 4: AI documentation

Create AI-readable documentation:

```txt
llms.txt
llms-full.txt
docs/components/button.ai.md
```

### Phase 5: Generators

After the manual examples are stable, build generators:

```txt
generate-react
generate-arrow
generate-vanilla
generate-remix
```

---

## Current status

This repository is at the foundation stage.

Current focus:

- define the architecture
- document the design model
- prepare the first component blueprint
- make the project easy for AI agents to understand

---

## Documentation

Start here:

- [`docs/architecture.md`](docs/architecture.md)
