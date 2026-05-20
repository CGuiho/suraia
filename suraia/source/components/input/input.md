# 🌻 Suraia Input Component

The **Input** component is an interactive text entry field used to collect user inputs such as text, passwords, email addresses, and phone numbers. This document serves as the single source of truth describing when to use, what is expected from framework adapters, and how the blueprint files are structured.

## 1. Overview & Usage Guidelines

### When to Use
- **Form Fields:** Gathering structured inputs (e.g. name, email, credentials).
- **Search Boxes:** Accepting queries.
- **Single/Multi-Line Editing:** Providing simple standard data entries.

### When NOT to Use
- **Very Long Paragraphs:** Use a `Textarea` blueprint instead of an text input field.
- **Predefined Options Selection:** Use a `Select` or `Dropdown` menu blueprint instead of a free-form input text box.

---

## 2. Component Architecture Blueprint

The Input component is defined by the following core files in this directory:
- [input.json](./input.json): Machine-readable metadata spec listing variants, states, slots, attributes, and accessibility contracts.
- [input.structure.html](./input.structure.html): Reference HTML layout structure defining slot positions and class names.
- [input.css](./input.css): Base layout styles (including floating label transformations, status borders, and state-based styling).
- [input.ts](./input.ts): Framework-agnostic interaction state behavior controller (`InputController`).

---

## 3. Visual Attributes & Variants

Every framework implementation must support these visual properties mapping directly to DOM attributes:

### 3.1 Variants (data-suraia-variant)
- **`outlined` (Default):** Full surrounding borders with no background.
- **`filled`:** Subtle dark/light background with a bottom border indicator.
- **`flushed`:** Bottom border only, taking minimal visual space.

### 3.2 Sizes (data-suraia-size)
- **`sm`:** Small height (32px / 2rem), compact padding.
- **`md` (Default):** Standard height (40px / 2.5rem).
- **`lg`:** Large height (48px / 3rem), high-visibility field.

---

## 4. Behavior, Accessibility, & States

To ensure accessible and consistent execution across frameworks, adapters must enforce the following behavior contract:

### 4.1 Floating Label
- The label sits in absolute position inside the input wrapper.
- When the input is focused OR has value content (not empty), the label must float up (translate and scale).
- The CSS handles this using the `.suraia-input-field:focus ~ .suraia-input-label` and `.suraia-input-field:not(:placeholder-shown) ~ .suraia-input-label` selectors. The framework adapter must ensure a space `" "` is set as a placeholder if no custom placeholder is present, or manage this class dynamically.

### 4.2 Disabled State
- **CSS Trigger:** Element gets `data-suraia-state="disabled"` or the native `disabled` attribute.
- **DOM Attribute:** Apply the native `disabled` attribute on the `<input>` element.
- **Interaction:** Prevent typing, focusing, and callback firing.

### 4.3 Validation & Invalid State
- **CSS Trigger:** Element gets `data-suraia-state="invalid"` when validation fails.
- **DOM Attribute:** Apply `aria-invalid="true"` to the input element when invalid.
- **Interaction:** Changes border highlights and helper text to status error colors.
- **Validation check:** Use `InputController.validate()` to check for required constraints.

### 4.4 Accessibility Contract
- **Keyboard Navigation:** Standard HTML keyboard support for focus traversal (`Tab` / `Shift+Tab`).
- **Label Linking:** The `<label>` element must point to the `<input>` element using the `for` attribute referencing the input's `id`.
- **Aria Describedby:** If a helper text slot is filled, link it to the input element using `aria-describedby` pointing to the helper block's unique ID.
