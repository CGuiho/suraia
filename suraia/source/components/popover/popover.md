# Popover

A floating panel triggered by a click on a reference element. Used to display complex HTML contents.

## Dependencies
None — Tier 3 Composite.

## AI Translation Notes
- Triggered on click event (unlike Tooltip which uses hover/focus).
- Open/closed state toggled via `[data-suraia-opened]` on the wrapper or popover element.
- Closes when the `Escape` key is pressed or when a click event is registered outside of the target/popover element.
- CSS-only absolute positioning using `transform` offsets relative to a `.suraia-popover-wrapper` container.
- Includes a customizable layout with a rotated square arrow matching the popover's background color.
