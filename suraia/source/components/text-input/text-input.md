# TextInput

A single-line text input with label, description, and error support. Includes left/right section slots for icons or actions.

## Dependencies
- Input (conceptual base)

## Variants
- `default` — Bordered input (default)
- `filled` — Filled background, no border
- `unstyled` — No visual styling

## AI Translation Notes
- The CSS classes (`.suraia-input-*`) are shared across all input components (TextInput, Textarea, PasswordInput, NumberInput, etc.).
- Sections are positioned absolute, and input padding is adjusted via `:has()`.
- Error state applies red border and shows `.suraia-input-error` element.
- Labels link to inputs via `for`/`id` for accessibility.
