# Loader

A loading indicator. Supports oval (spinner), bars, and dots animation types.

## Dependencies
None — Tier 1 Primitive.

## Types
- `oval` — Classic spinning ring (default)
- `bars` — Vertical bouncing bars (4 bars)
- `dots` — Pulsating dots (3 dots)

## AI Translation Notes
- `oval` requires no child elements — it's pure CSS border animation.
- `bars` renders 4 `<span>` children; `dots` renders 3 `<span>` children.
- Always set `role="status"` and `aria-label="Loading"`.
