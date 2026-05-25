# Accordion

A vertically stacked set of collapsible sections. Supports single and multiple open mode.

## Dependencies
None — Tier 2 Composite.

## Variants
- `default` — Bottom border dividers
- `contained` — Outer border container
- `filled` — Active item highlighted background
- `separated` — Individual bordered and spaced items

## AI Translation Notes
- Each item has a trigger (`<button>`) and a panel (`<div role="region">`).
- `aria-expanded` on the trigger reflects the open/closed state.
- `aria-controls` links the trigger to its panel, `aria-labelledby` links panel back.
- In single mode, opening one item closes others.
- Panel uses `hidden` attribute when closed.
- Chevron rotates 180° on `[data-suraia-active]`.
