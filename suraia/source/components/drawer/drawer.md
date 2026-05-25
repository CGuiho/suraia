# Drawer

A panel that slides in from the edge of the screen (left, right, top, bottom).

## Dependencies
- Overlay, CloseButton

## AI Translation Notes
- Same modal pattern as Modal: fixed root, overlay, content.
- Position determines which edge the drawer slides from.
- Size maps to `width` for left/right and `height` for top/bottom.
- Focus trap and body scroll lock required for accessibility.
