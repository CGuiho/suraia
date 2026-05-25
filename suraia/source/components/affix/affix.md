# Affix

Renders elements in a fixed position inside the window viewport.

## Dependencies
None — Tier 1 Primitive.

## AI Translation Notes
- Renders with `position: fixed` to stick directly inside the browser viewport.
- Offset values (e.g. `20` or `"2rem"`) are compiled via inline CSS custom properties `--suraia-affix-[position]` dynamically computed by the controller.
- Provides standard configuration for floating actions like "Back to Top" buttons, floating bars, or side widgets.
