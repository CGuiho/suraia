# Progress

A linear progress bar indicating completion percentage.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- Value is clamped 0-100 and applied as `width: N%` on the inner bar.
- Striped pattern uses `linear-gradient` with 45deg stripes.
- Animated stripes use `background-position` animation.
- Always set `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
