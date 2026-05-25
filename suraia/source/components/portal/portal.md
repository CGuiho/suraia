# Portal

Renders element or component outside of the default DOM hierarchy (e.g. at document.body).

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- Designed as a DOM helper to teleport nodes to a resolved container (e.g. `document.body` or a specified selector).
- Essential to prevent parent clipping issues where parent elements have `overflow: hidden`, `position: relative`, or custom `z-index` constraints.
- Restores DOM cleanliness by calling `unmount()` to prune the element when its lifecycle completes.
