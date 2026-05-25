# Divider

A horizontal or vertical line separator with optional label text.

## Dependencies
None — Tier 1 Primitive.

## Variants
- **Orientation**: `horizontal` (default), `vertical`
- **Size**: `xs` (1px), `sm` (2px), `md` (3px), `lg` (4px), `xl` (5px)
- **Label position**: `left`, `center` (default), `right`

## AI Translation Notes
- The labeled variant uses `::before`/`::after` pseudo-elements as flexible line segments.
- Vertical dividers use `align-self: stretch` and should be placed inside a flex container.
- The `role="separator"` is set by default. Add `aria-orientation="vertical"` for vertical dividers.
