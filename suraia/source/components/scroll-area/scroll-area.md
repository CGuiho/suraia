# ScrollArea

A visual and structural layout container replacing native browser scrollbars with custom, themeable horizontal and vertical scrollbars.

## Dependencies

None — Tier 1 Primitive.

## AI Translation Notes

- Wraps scrollable content inside viewport wrappers (`.suraia-scroll-area-viewport`).
- Viewport must have native scrollbars hidden via `scrollbar-width: none` and `-webkit-scrollbar` display options.
- Custom scrollbar thumbs sizes and offsets are updated dynamically using absolute positioning and inline styles (e.g. `transform: translateY(offsetPx)`).
