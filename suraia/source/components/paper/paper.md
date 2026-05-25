# Paper

A card-like surface container with optional shadow, border, and border radius. Paper is the foundational surface component that Card builds upon.

## Dependencies
None — Tier 1 Primitive.

## Attributes
- `shadow` — Shadow level: `none` (default), `xs`, `sm`, `md`, `lg`, `xl`
- `radius` — Border radius: any radius token key (default: `md`)
- `withBorder` — Adds a 1px solid border using `--suraia-surface-border` (default: `false`)

## AI Translation Notes
- Paper uses `--suraia-surface-0` for background (responds to light/dark scheme).
- Shadow values map directly to `--suraia-shadow-*` tokens.
- The `withBorder` attribute adds a subtle border using the surface border color.
