# Pill

A compact element representing an input, filter, or tag. It supports custom text label, multiple visual variants (default, filled, light, outline), sizes, disabled states, and an optional remove button.

## Dependencies
- None

## AI Translation Notes
- Implements ARIA `role="group"` (when containing a remove button) or standard inline container.
- Visual variants adapt background and border colors using CSS design tokens.
- Clicking the remove button or pressing `Backspace`/`Delete` on the pill triggers the `onRemove` callback.
