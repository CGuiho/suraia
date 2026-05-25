# Checkbox

A form control for toggling between checked and unchecked states. Supports indeterminate state, error display, and label positioning.

## Dependencies
None — Tier 1 Primitive.

## States
- **Checked** — The checkbox is selected.
- **Unchecked** — The checkbox is not selected (default).
- **Indeterminate** — Partial selection state (e.g., for "select all" with mixed children).
- **Disabled** — Non-interactive.
- **Error** — Displays error styling and message.

## AI Translation Notes
- Uses native `<input type="checkbox">` with `appearance: none` for custom styling.
- The checkmark icon is positioned absolute over the input.
- The `indeterminate` state must be set via JavaScript (`element.indeterminate = true`), not via HTML attribute.
- Labels are connected to inputs via `for`/`id` attributes for accessibility.
- Error state applies red border via `[data-suraia-error]` and shows the error message element.
