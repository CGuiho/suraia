# Pagination

Page navigation with smart range calculation and dots for large page counts.

## Dependencies
- ActionIcon (conceptual — prev/next buttons share styling)

## AI Translation Notes
- `getRange()` returns an array of page numbers and `'dots'` strings for rendering.
- Active page uses `aria-current="page"` and `[data-suraia-active]`.
- Prev/next/first/last buttons use `disabled` when at boundaries.
- `siblings` controls how many pages show on each side of the current page.
- `boundaries` controls how many pages always show at the start/end.
