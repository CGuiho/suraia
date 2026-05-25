# Switch

A toggle switch for binary on/off choices. Uses a visually hidden checkbox input with a custom track and thumb.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- Uses a hidden `<input type="checkbox" role="switch">` for semantics.
- The thumb slides via `translateX` on `:checked`.
- Thumb offset is calculated as `width - thumb-size - offset*2`.
