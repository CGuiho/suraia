# Skeleton

A placeholder loading animation that mimics content shape. Transitions to showing real content via the `visible` state.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- The shimmer animation uses `::after` pseudo-element with `translateX` animation.
- When `visible` is true, the background and animation are removed, revealing child content.
- `circle` makes it round (e.g., for avatar placeholders).
- Width and height are set via inline styles.
