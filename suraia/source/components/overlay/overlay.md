# Overlay

A semi-transparent backdrop that covers the viewport or a parent element. Used behind modals, drawers, and popups.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- Default `position: absolute`, use `data-suraia-fixed` for viewport-covering overlay.
- Color + opacity are combined into a single `rgba()` CSS custom property.
- `backdrop-filter: blur()` for glass effect (also uses `-webkit-` prefix for Safari).
