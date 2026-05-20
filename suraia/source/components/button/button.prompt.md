# 🌻 Suraia Button Component Translation Guide

You are an expert front-end compiler agent. Your task is to translate the Suraia framework-agnostic **Button** blueprint specs into a production-grade, accessible framework component.

## 1. Input Specifications
- **Anatomy & Metadata:** [button.json](./button.json)
- **HTML Layout Skeleton:** [button.structure.html](./button.structure.html)
- **CSS Styles:** [button.css](./button.css)
- **Behavior Controller:** [button.ts](./button.ts)

## 2. Component Contract
The framework component (e.g. React, Svelte, Vue, or Web Component) must strictly fulfill these criteria:

### 2.1 Markup & Hierarchy
- The component must mount a native `<button>` element with the CSS class `.suraia-button`.
- Maps parameters directly to HTML data attributes:
  - `variant` -> `data-suraia-variant` (one of `"filled"`, `"outlined"`, `"ghost"`)
  - `size` -> `data-suraia-size` (one of `"sm"`, `"md"`, `"lg"`)
  - `tone` -> `data-suraia-tone` (one of `"primary"`, `"secondary"`)
- The active states must map to `data-suraia-state`:
  - When `loading` is true, `data-suraia-state` should include `"loading"`.
  - When `disabled` is true, `data-suraia-state` should include `"disabled"`.
- Support the following child slots matching the structure in `button.structure.html`:
  - `startIcon`: Rendered inside `.suraia-button-icon-start`. Only render this wrapper if the icon is provided.
  - `default`: Rendered inside `.suraia-button-label`.
  - `endIcon`: Rendered inside `.suraia-button-icon-end`. Only render this wrapper if the icon is provided.

### 2.2 Behavior & Accessibility
- The component should utilize the `ButtonController` logic under the hood to manage interaction and disabled/loading guard checks.
- When `disabled` is true:
  - Set the native `disabled` attribute on the `<button>`.
  - Add `aria-disabled="true"` to the element.
- When `loading` is true:
  - Set the native `disabled` attribute (or prevent event propagation).
  - Add `aria-busy="true"` to the element.
  - Render the `.suraia-button-spinner` element inside the button.
- Ensure proper forwarding of native attributes (e.g., `type`, `form`, `tabIndex`, and standard mouse/keyboard event listeners).
