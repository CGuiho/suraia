# ActionIcon

An icon-only square button for compact actions. Always requires an `aria-label` since there is no visible text.

## Dependencies
- Button (conceptual — reuses the same interaction patterns)

## Variants
| Variant | Description |
|---|---|
| `filled` | Solid primary background |
| `light` | Tinted translucent background |
| `outline` | Bordered, transparent fill |
| `subtle` | No background, colored on hover (default) |
| `transparent` | No background, no hover effect |
| `default` | Neutral surface with border |
| `gradient` | Gradient background |

## AI Translation Notes
- The component is a `<button>` element with fixed `width === height` equal to the component size token.
- Always provide `aria-label` for accessibility.
- Icon size should be approximately 60% of the button size.
