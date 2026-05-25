# OverflowList

A layout composite that displays a list of items up to a defined limit, collapsing the remaining items into an overflow badge/dropdown to prevent visual clutter in headers, tags lists, or navbars.

## Dependencies

None — Tier 2 Composite (can be integrated with dropdown or popovers).

## AI Translation Notes

- Manage layout using flexbox without wrapping.
- Slice items using JavaScript logic based on `collapsePosition` ('start' or 'end').
- Uses a simple placeholder string `{count}` in `overflowLabel` to dynamically generate the collapsed badge contents.
