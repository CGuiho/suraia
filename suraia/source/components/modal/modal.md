# Modal

A dialog window overlaid on the main content. Traps focus, blocks background interaction, and supports Escape to close.

## Dependencies
- Overlay, CloseButton, Paper

## Sizes
| Size | Max Width |
|---|---|
| xs | 320px |
| sm | 380px |
| md | 440px (default) |
| lg | 620px |
| xl | 780px |
| full | 100% |

## AI Translation Notes
- Root element is `position: fixed; inset: 0` with `display: none` by default, shown via `[data-suraia-opened]`.
- Focus trap must be implemented in JS — Tab key should cycle within the modal.
- `aria-modal="true"` and `role="dialog"` are required.
- `aria-labelledby` should point to the title element's ID.
- Body scroll should be locked when modal is open.
