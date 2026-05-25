# Tooltip

A floating label that appears on hover or focus. Provides additional context without cluttering the UI.

## Dependencies
None — Tier 2 Composite.

## AI Translation Notes
- Position is CSS-only via `position: absolute` relative to the wrapper.
- Show/hide is triggered via `:hover` and `:focus-within` on the wrapper, or via `[data-suraia-opened]`.
- Arrow is a rotated square element positioned based on tooltip direction.
- Uses `z-index: var(--suraia-z-index-overlay)` to float above content.
- `openDelay` and `closeDelay` require JavaScript timers.
