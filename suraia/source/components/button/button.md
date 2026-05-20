# 🌻 Suraia Button Component

The **Button** component is an interactive element used to trigger actions, submit forms, or open overlays. This document serves as the single source of truth describing when to use, what is expected from framework adapters, and how the blueprint files are structured.

## 1. Overview & Usage Guidelines

### When to Use
- **Trigger Actions:** Initiating a process (e.g., "Save", "Delete", "Send").
- **Form Submission:** Submitting forms using `type="submit"`.
- **Dismissal/Confirmation:** Primary action triggers in dialogs and modals.

### When NOT to Use
- **Navigation to Pages:** If clicking the element navigates the user to another page/URL, generate an anchor `<a>` element styled as a button instead of a `<button>`.
- **Inline Text Links:** Use standard link text anchors within body text.

---

## 2. Component Architecture Blueprint

The Button component is defined by the following core files in this directory:
- [button.json](./button.json): Machine-readable metadata spec listing variants, states, slots, attributes, and accessibility contracts.
- [button.structure.html](./button.structure.html): Reference HTML layout structure defining slot positions and class names.
- [button.css](./button.css): Base layout styles (flex alignment, padding, focus state overrides, and state-based styling).
- [button.ts](./button.ts): Framework-agnostic interaction state behavior controller (`ButtonController`).

---

## 3. Visual Attributes & Variants

Every framework implementation must support these visual properties mapping directly to DOM attributes:

### 3.1 Variants (data-suraia-variant)
- **`filled` (Default):** High emphasis action. Uses full color background.
- **`outlined`:** Medium emphasis action. Uses borders and transparent backgrounds.
- **`ghost`:** Low emphasis action. Transparent background and borders, only showing backgrounds on hover.

### 3.2 Sizes (data-suraia-size)
- **`sm`:** Small height (32px / 2rem), compact padding and typography.
- **`md` (Default):** Medium height (40px / 2.5rem).
- **`lg`:** Large height (48px / 3rem), spacious layout for primary CTAs.

### 3.3 Tones (data-suraia-tone)
- **`primary` (Default):** Brand primary visual style.
- **`secondary`:** Brand secondary/neutral visual style.

---

## 4. Behavior, Accessibility, & States

To ensure accessible and consistent execution across frameworks, adapters must enforce the following behavior contract:

### 4.1 Disabled State
- **CSS Trigger:** Element gets `data-suraia-state="disabled"` or the native `disabled` attribute.
- **DOM Attribute:** Apply the native `disabled` attribute and `aria-disabled="true"`.
- **Interaction:** Disable all hover effects and mouse/keyboard event triggering.

### 4.2 Loading State
- **CSS Trigger:** Element gets `data-suraia-state="loading"`.
- **Visuals:** Displays the `.suraia-button-spinner` element inside the button.
- **DOM Attribute:** Apply `aria-busy="true"` and the native `disabled` attribute to prevent user inputs during execution.
- **Interaction:** Disable mouse and keyboard event propagation.

### 4.3 Accessibility Contract
- **Semantic Tag:** Render a native `<button>` element (unless rendering an anchor-based link variant).
- **Keyboard Activation:** Must support trigger activation via `Enter` and `Space` keys (inherent to native buttons, must be manually handled if custom/polyfilled elements are utilized).
- **Controller Logic:** Framework adapter logic should delegate interaction checking to `ButtonController` in `button.ts`.
