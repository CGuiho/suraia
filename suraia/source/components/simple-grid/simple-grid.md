# SimpleGrid

A responsive grid layout with equal-width columns.

## AI Translation Notes
- Renders as a container with CSS Grid `display: grid`.
- Column count is set via `--suraia-grid-cols`.
- Column widths are auto-calculated using `repeat(N, minmax(0, 1fr))`.
