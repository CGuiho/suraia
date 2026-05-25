# Stack

A vertical flex layout container. Arranges children in a column with configurable spacing.

## Dependencies
None — Tier 1 Primitive.

## Attributes
- `gap` — Space between children (default: `md` → 16px)
- `align` — Cross-axis alignment (default: `stretch`)
- `justify` — Main-axis alignment (default: `flex-start`)

## AI Translation Notes
- Gap, align, and justify are injected as CSS custom properties via inline styles.
- Maps to a simple `display: flex; flex-direction: column` container.
