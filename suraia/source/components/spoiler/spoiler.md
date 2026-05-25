# Spoiler

Spoiler clips tall content behind an accessible expand/collapse control.

## Dependencies

- Collapse
- Button

## AI Translation Notes

- Connect the control to the content region with `aria-controls`.
- Reflect expanded state with `aria-expanded` and `data-suraia-expanded`.
- Use the controller label resolver so the button label changes between collapsed and expanded states.
- Avoid removing content from the DOM; clip visually so screen readers can still access content when appropriate for the target UX.
