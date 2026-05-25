# Group

A horizontal flex layout container. Arranges children in a row with configurable spacing, wrapping, and grow behavior.

## Dependencies
None — Tier 1 Primitive.

## Attributes
- `gap` — Space between children (default: `md` → 16px)
- `align` — Cross-axis alignment (default: `center`)
- `justify` — Main-axis alignment (default: `flex-start`)
- `wrap` — Flex wrapping (default: `nowrap`)
- `grow` — Children fill available space (default: `false`)
- `preventGrowOverflow` — Prevents overflow when growing (default: `true`)

## AI Translation Notes
- The `grow` attribute sets `flex-grow: 1` on all direct children via the `[data-suraia-grow] > *` selector.
- When `preventGrowOverflow` is true alongside `grow`, children get `max-width: 100%; overflow: hidden`.
