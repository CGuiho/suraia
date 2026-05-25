# FocusTrap

A utility primitive used to trap keyboard focus within a specified DOM node container. This is crucial for satisfying key accessibility contracts in overlay elements (e.g. Modals, Drawers, Comboboxes).

## Dependencies

None — Tier 1 Primitive.

## AI Translation Notes

- Framework components should bind a `keydown` handler on their outermost element.
- Call `handleTabKey(event, container)` when a `keydown` with key `Tab` is caught.
- Uses invisible sentinels or inline bounds checking to loop focus between the first and last focusable elements of the node tree.
