# Alert

A feedback component for displaying important messages. Supports colored variants with optional icon, title, and close button.

## Dependencies
- CloseButton (optional, for dismiss behavior)

## Variants
| Variant | Description |
|---|---|
| `filled` | Solid color background |
| `light` | Translucent tinted background (default) |
| `outline` | Bordered, transparent fill |
| `transparent` | No background |
| `default` | Neutral surface with border |

## Colors
`primary`, `error`, `success`, `warning`, `info` (default)

## AI Translation Notes
- Uses `role="alert"` for accessibility.
- Color is mapped via `--suraia-alert-color` CSS custom property.
- In `filled` variant, both icon and title inherit the `on-color` contrast.
- Close button is positioned absolute, top-right.
