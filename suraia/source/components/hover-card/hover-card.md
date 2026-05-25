# HoverCard

A floating card that displays additional information when hovering over a trigger element.

## Dependencies
None — Tier 3 Composite.

## AI Translation Notes
- Opens on mouse hover after `openDelay` (default: 300ms) and closes after `closeDelay` (default: 400ms).
- Delays prevent flickering/accidental triggers when moving the mouse between the trigger and the card content.
- Position is CSS-only absolute layout, aligned using `transform: translateX(-50%) translateY(...)` relative to wrapper.
- Uses `z-index: var(--suraia-z-index-overlay)` to render on top of other content.
