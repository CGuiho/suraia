# suraira

**npm package:** `@guiho/suraira`

suraira is intended to be an AI-first UI blueprint library. It is not primarily a React component library, a Remix component library, an ArrowJS component library, or a Web Components library. Instead, suraira stores the neutral knowledge required to describe UI components in a way that humans and AI coding agents can translate into multiple environments.

The core idea is simple:

> A component should have one source of truth: its structure, style, behavior, accessibility contract, and usage rules. Framework-specific code should be an output, not the foundation.

---

## 1. Vision

suraira should allow a developer or AI assistant to use the same component knowledge in different environments:

- Vanilla HTML, CSS, and JavaScript
- ArrowJS
- Remix 3
- React
- Optional Web Components

The project should begin as a documentation and blueprint system, then later evolve into code generation, adapters, and runtime helpers.

The goal is not to create finished functional components immediately. The first goal is to create a strong, consistent, AI-readable component system that defines:

- HTML structure
- CSS structure
- design tokens
- visual profiles
- behavior logic
- accessibility rules
- framework translation instructions
- implementation examples

---

## 2. Core philosophy

suraira should be blueprint-first, not framework-first.

Most UI libraries start with components such as:

```txt
ButtonReact.tsx
ButtonVue.vue
ButtonWebComponent.ts
```

suraira should start with neutral component blueprints instead:

```txt
button/
  button.spec.ts
  button.structure.html
  button.styles.css
  button.behavior.ts
  button.accessibility.md
  button.ai.md
```

From this source, AI tools or future generators can produce:

```txt
React Button
Remix Button
ArrowJS Button
Vanilla HTML example
Web Component adapter
```

This makes suraira portable, stable, and suitable for AI-assisted development.

---

## 3. Target environments

### 3.1 Vanilla HTML, CSS, and JavaScript

The base target should always be the platform:

- semantic HTML
- CSS custom properties
- standard CSS classes
- data attributes
- plain JavaScript behavior controllers

Vanilla usage should always be possible without React, Remix, ArrowJS, a build step, or a runtime framework.

### 3.2 ArrowJS

ArrowJS can consume the same HTML structure, CSS, and behavior controllers. ArrowJS adapters should generate `html` template literal components and attach behavior through lifecycle cleanup patterns.

The ArrowJS target should not own the component design. It should only translate the blueprint into ArrowJS syntax.

### 3.3 Remix 3

Remix 3 should be supported through platform-first code:

- normal HTML structure
- CSS files
- progressive enhancement
- optional Remix-specific exports later

Because Remix 3 is still evolving, suraira should avoid depending too strongly on unstable Remix internals at the beginning. The safest Remix target is a framework-compatible component shape built from regular markup, CSS imports, and standard JavaScript.

### 3.4 React

React support should be an adapter layer that turns the blueprint into JSX and optional hooks.

React should not define the source of truth. React components should be generated or manually written from the blueprint.

### 3.5 Web Components

Web Components should be optional adapters, not the foundation.

A Web Component like this is useful:

```html
<sui-button>Save</sui-button>
```

But it hides the internal structure from React, Remix, ArrowJS, and AI agents. Since the goal is for AI to generate native framework code, Web Components should be one output among many, not the core model.

---

## 4. System layers

suraira should be organized into five main layers:

```txt
1. Design Profiles
2. Design Tokens
3. Component Blueprints
4. Behavior Controllers
5. Framework Adapters and AI Guides
```

### 4.1 Design Profiles

A design profile defines the visual personality of the system.

Examples:

```txt
profiles/
  material-like/
  apple-like/
  brutalist/
  enterprise/
  suraira-default/
```

A profile is not a component. It is a design language.

A Material-like profile may use:

- rounded controls
- elevation
- filled, tonal, and outlined controls
- semantic color roles
- motion tokens

An Apple-like profile may use:

- softer radii
- subtle borders
- restrained shadows
- system-like spacing
- clean typography

Important: profiles can be inspired by public design guidelines, but the project should avoid copying proprietary design assets or claiming to be an official implementation of another company's design system.

### 4.2 Design Tokens

Design tokens are the styling foundation.

Initial token categories:

```txt
tokens/
  color
  typography
  spacing
  radius
  shadow
  border
  motion
  z-index
  density
  focus
```

Example base tokens:

```css
:root {
  --sui-color-primary: #2563eb;
  --sui-color-on-primary: #ffffff;

  --sui-radius-sm: 0.375rem;
  --sui-radius-md: 0.625rem;
  --sui-radius-lg: 0.875rem;

  --sui-space-1: 0.25rem;
  --sui-space-2: 0.5rem;
  --sui-space-3: 0.75rem;
  --sui-space-4: 1rem;

  --sui-font-family-body: system-ui, sans-serif;

  --sui-duration-fast: 120ms;
  --sui-duration-normal: 180ms;
}
```

Example profile overrides:

```css
[data-sui-profile="material-like"] {
  --sui-radius-md: 999px;
  --sui-button-height-md: 40px;
  --sui-button-shadow-elevated: 0 1px 3px rgb(0 0 0 / 0.2);
}

[data-sui-profile="apple-like"] {
  --sui-radius-md: 12px;
  --sui-button-height-md: 36px;
  --sui-button-shadow-elevated: none;
}
```

This allows the same component blueprint to change appearance depending on the active profile.

### 4.3 Component Blueprints

A component blueprint describes a UI component without binding it to a framework.

Each blueprint should define:

- name
- purpose
- anatomy
- valid HTML structure
- slots
- variants
- states
- CSS classes
- CSS custom properties
- behavior requirements
- accessibility rules
- framework translation instructions

Example button blueprint object:

```ts
export const buttonBlueprint = {
  name: "Button",

  anatomy: {
    root: "button",
    slots: ["leadingIcon", "label", "trailingIcon"],
  },

  variants: {
    tone: ["primary", "secondary", "danger", "neutral"],
    variant: ["filled", "soft", "outline", "ghost"],
    size: ["sm", "md", "lg"],
  },

  states: [
    "hover",
    "focus-visible",
    "active",
    "disabled",
    "loading",
  ],

  attributes: {
    "data-sui-component": "button",
    "data-sui-variant": "filled",
    "data-sui-tone": "primary",
    "data-sui-size": "md",
  },

  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    disabled: "Use native disabled for <button>, aria-disabled for non-button hosts",
  },
};
```

Example neutral button HTML:

```html
<button
  class="sui-button"
  data-sui-component="button"
  data-sui-variant="filled"
  data-sui-tone="primary"
  data-sui-size="md"
>
  <span class="sui-button__label">Save</span>
</button>
```

Example portable CSS:

```css
.sui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sui-button-gap, var(--sui-space-2));
  min-height: var(--sui-button-height-md, 2.5rem);
  padding-inline: var(--sui-button-padding-x, var(--sui-space-4));
  border-radius: var(--sui-button-radius, var(--sui-radius-md));
  font-family: var(--sui-font-family-body);
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color var(--sui-duration-fast),
    border-color var(--sui-duration-fast),
    box-shadow var(--sui-duration-fast),
    transform var(--sui-duration-fast);
}

.sui-button[data-sui-variant="filled"][data-sui-tone="primary"] {
  background: var(--sui-color-primary);
  color: var(--sui-color-on-primary);
}

.sui-button:focus-visible {
  outline: var(--sui-focus-ring-width, 2px) solid var(--sui-focus-ring-color, currentColor);
  outline-offset: var(--sui-focus-ring-offset, 2px);
}

.sui-button:disabled,
.sui-button[data-sui-disabled="true"] {
  opacity: 0.55;
  cursor: not-allowed;
}
```

### 4.4 Behavior Controllers

Interactive logic should be written as framework-independent JavaScript or TypeScript.

Behavior should not start as React hooks. Behavior should start as platform controllers.

Example:

```ts
export function enhanceButton(
  element: HTMLElement,
  options: {
    loading?: boolean;
    onPress?: (event: Event) => void;
  } = {},
) {
  const controller = new AbortController();

  element.addEventListener(
    "click",
    event => {
      if (
        element.getAttribute("aria-disabled") === "true" ||
        element.hasAttribute("disabled") ||
        options.loading
      ) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      options.onPress?.(event);
    },
    { signal: controller.signal },
  );

  if (options.loading) {
    element.setAttribute("data-sui-loading", "true");
    element.setAttribute("aria-busy", "true");
  }

  return {
    destroy() {
      controller.abort();
    },
  };
}
```

Then each target environment wraps this same behavior.

### 4.5 Framework Adapters and AI Guides

Adapters should translate the blueprint into framework-specific usage.

The adapters are outputs:

```txt
Vanilla HTML + CSS + JS
React JSX + CSS module or CSS import
Remix component + CSS route links or CSS imports
ArrowJS html template literal
Web Component adapter
```

AI guides should explain how to perform these translations reliably.

---

## 5. Example framework outputs

### 5.1 Vanilla usage

```html
<link rel="stylesheet" href="/suraira/tokens.css" />
<link rel="stylesheet" href="/suraira/button.css" />

<button
  class="sui-button"
  data-sui-component="button"
  data-sui-variant="filled"
  data-sui-tone="primary"
  data-sui-size="md"
>
  <span class="sui-button__label">Save</span>
</button>

<script type="module">
  import { enhanceButton } from "/suraira/button.js";

  document.querySelectorAll(".sui-button").forEach(button => {
    enhanceButton(button, {
      onPress() {
        console.log("Pressed");
      },
    });
  });
</script>
```

### 5.2 React wrapper

```tsx
import { useEffect, useRef } from "react";
import { enhanceButton } from "@guiho/suraira/button";
import "@guiho/suraira/css/button.css";

export function Button({ children, onClick, variant = "filled" }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = enhanceButton(ref.current, {
      onPress: onClick,
    });

    return () => instance.destroy();
  }, [onClick]);

  return (
    <button
      ref={ref}
      className="sui-button"
      data-sui-component="button"
      data-sui-variant={variant}
      data-sui-tone="primary"
      data-sui-size="md"
    >
      <span className="sui-button__label">{children}</span>
    </button>
  );
}
```

### 5.3 ArrowJS wrapper

```ts
import { html, component, onCleanup } from "@arrow-js/core";
import { enhanceButton } from "@guiho/suraira/button";

export const Button = component((props: {
  label: string;
  onPress?: (event: Event) => void;
}) => {
  let el: HTMLButtonElement | undefined;

  queueMicrotask(() => {
    if (!el) return;

    const instance = enhanceButton(el, {
      onPress: props.onPress,
    });

    onCleanup(() => instance.destroy());
  });

  return html`
    <button
      ${node => (el = node as HTMLButtonElement)}
      class="sui-button"
      data-sui-component="button"
      data-sui-variant="filled"
      data-sui-tone="primary"
      data-sui-size="md"
    >
      <span class="sui-button__label">${props.label}</span>
    </button>
  `;
});
```

The exact DOM reference pattern can be adjusted based on ArrowJS conventions. The important point is that ArrowJS consumes the same structure, CSS, and behavior controller.

### 5.4 Remix target

The first Remix target should stay conservative and platform-first:

```tsx
import "@guiho/suraira/css/button.css";

export function Button({ children }) {
  return (
    <button
      className="sui-button"
      data-sui-component="button"
      data-sui-variant="filled"
      data-sui-tone="primary"
      data-sui-size="md"
    >
      <span className="sui-button__label">{children}</span>
    </button>
  );
}
```

Later, suraira can provide Remix-specific conventions once Remix 3 stabilizes.

---

## 6. Proposed repository structure

Initial long-term structure:

```txt
suraira/
  packages/
    core/
      src/
        components/
          button/
            button.spec.ts
            button.structure.html
            button.styles.css
            button.behavior.ts
            button.accessibility.md
            button.ai.md

          input/
          card/
          dialog/
          menu/
          select/

        tokens/
          primitive.css
          semantic.css
          component.css

        profiles/
          material-like/
            tokens.css
            button.css
            profile.ai.md

          apple-like/
            tokens.css
            button.css
            profile.ai.md

          suraira-default/
            tokens.css
            button.css
            profile.ai.md

    react/
      src/
        Button.tsx
        useSuraiaButton.ts

    arrow/
      src/
        Button.ts

    vanilla/
      src/
        auto-enhance.ts

    web-components/
      src/
        sui-button.ts

    remix/
      src/
        Button.tsx
        links.ts

    compiler/
      src/
        generate-react.ts
        generate-arrow.ts
        generate-vanilla.ts
        generate-remix.ts

  docs/
    architecture.md
    llms.md
    components/
      button.md
      input.md
      card.md

  examples/
    vanilla/
    react/
    arrow/
    remix-3/
```

At the start, the repository can be much simpler:

```txt
suraira/
  docs/
    architecture.md
  packages/
    core/
      src/
        tokens/
        profiles/
        components/
          button/
```

---

## 7. Naming conventions

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

The `sui` prefix is short, readable, and tied to Suraia UI.

---

## 8. First MVP components

Do not start with many components.

Start with five:

| Component | Reason |
| --- | --- |
| Button | Variants, states, accessibility, basic behavior |
| Input | Labels, validation, error messages, form behavior |
| Card | Layout, slots, styling-only component |
| Badge | Small static component, useful for token and variant testing |
| Dialog | Focus trap, escape key, overlay, accessibility complexity |

If these five components are modeled correctly, the architecture is strong enough to expand.

---

## 9. Recommended development phases

### Phase 1: Style system

Create:

```txt
tokens.css
profiles/suraira-default/tokens.css
profiles/material-like/tokens.css
profiles/apple-like/tokens.css
```

The goal is to support:

```html
<body data-sui-profile="suraira-default">
```

or:

```html
<body data-sui-profile="material-like">
```

### Phase 2: Button blueprint

Create:

```txt
button.spec.ts
button.structure.html
button.styles.css
button.behavior.ts
button.accessibility.md
button.ai.md
```

### Phase 3: Manual adapters

Write by hand:

```txt
React Button
ArrowJS Button
Vanilla Button
Remix Button
```

Do not build the compiler yet.

### Phase 4: AI instructions

Create:

```txt
llms.txt
llms-full.txt
components/button.ai.md
profiles/suraira-default/profile.ai.md
```

Then test with AI tools by asking:

```txt
Using suraira, create a React Button component from the Button blueprint.
```

The expected output should be consistent, accessible, and aligned with the blueprint.

### Phase 5: Generator

Only after the manual examples are stable, build:

```txt
generate-react
generate-arrow
generate-vanilla
generate-remix
```

The generator should consume the component blueprint and produce target-specific code.

---

## 10. AI-first documentation plan

suraira should include AI-readable documentation from the beginning.

Recommended docs:

```txt
/llms.txt
/llms-full.txt
/docs/architecture.md
/docs/components/button.md
/docs/components/button.ai.md
/docs/profiles/material-like.md
/docs/profiles/apple-like.md
```

Initial `llms.txt` concept:

```md
# suraira

suraira is a component blueprint library, not a framework-specific component library.

The source of truth for each component is:

1. HTML anatomy
2. CSS classes
3. CSS custom properties
4. behavior controller
5. accessibility contract
6. framework translation rules

When using React, generate JSX using the documented structure and import the CSS.

When using ArrowJS, generate html template literals using the documented structure and call the behavior controller during client enhancement.

When using Remix 3, prefer standard HTML, CSS files, and progressive enhancement. Avoid relying on unstable Remix internals unless the project explicitly requests it.

When using vanilla HTML, copy the HTML structure, CSS files, and call the enhancement function manually.
```

---

## 11. Important architectural decision

Use CSS custom properties and data attributes as the universal styling interface.

Preferred:

```html
<button
  class="sui-button"
  data-sui-variant="filled"
  data-sui-tone="primary"
  data-sui-size="md"
>
```

Less preferred:

```html
<button class="sui-button sui-button-filled sui-button-primary sui-button-md">
```

Data attributes are easier for AI to understand, easier for CSS to target, and easier for multiple frameworks to generate consistently.

---

## 12. Final architecture diagram

```txt
                         ┌──────────────────────┐
                         │    Design Profiles    │
                         │ Material / Apple / ...│
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │     Design Tokens     │
                         │ color/space/type/etc. │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │ Component Blueprints  │
                         │ anatomy/states/a11y   │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │ Behavior Controllers  │
                         │ platform JS modules   │
                         └──────────┬───────────┘
                                    │
       ┌───────────────┬────────────┼────────────┬───────────────┐
       ▼               ▼            ▼            ▼               ▼
   Vanilla HTML     React JSX    Remix 3      ArrowJS       Web Component
   + CSS + JS       wrapper      wrapper      template      adapter
```

---

## 13. Initial conclusion

suraira should be an AI-readable UI blueprint system.

The source of truth should be:

```txt
HTML anatomy
CSS tokens
CSS classes
data attributes
behavior controller
accessibility contract
AI translation guide
```

React, Remix 3, ArrowJS, vanilla HTML, and Web Components should be treated as outputs.

The first serious proof of concept should be the Button blueprint, followed by Input, Card, Badge, and Dialog.
