# FloatingWindow

FloatingWindow is a movable, resizable utility panel that can stay non-modal.

## Dependencies

- Paper
- CloseButton

## AI Translation Notes

- Use `role="dialog"` and connect a visible title with `aria-labelledby` when available.
- Dragging should update controller position; resizing should update controller size while respecting min and max bounds.
- Do not trap focus unless the generated instance is explicitly modal.
- Persist position and size in application state only when the target project requests it.
