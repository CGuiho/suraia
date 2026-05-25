# Radio

A form control for selecting a single option from a group. Only one radio in a group can be selected at a time.

## Dependencies
None — Tier 1 Primitive.

## Variants
- `filled` — Selected radio fills the entire circle (default)
- `outline` — Selected radio shows a colored inner dot with a border ring

## AI Translation Notes
- Uses native `<input type="radio">` with `appearance: none`.
- The inner dot is a `::after` pseudo-element or sibling `<span>` that animates on `:checked`.
- Radios must share a `name` attribute to form a group.
- Arrow keys navigate between radios in the same group.
