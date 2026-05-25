# Badge

A small status descriptor for UI elements. Displays a label with optional left/right sections inside a pill-shaped container.

## Dependencies

None — this is a Tier 1 Primitive.

## Variants

| Variant | Description |
|---|---|
| `filled` | Solid background with contrasting text (default) |
| `light` | Translucent tinted background with colored text |
| `outline` | Transparent with colored border |
| `dot` | Neutral badge with a colored dot indicator |
| `transparent` | No background, colored text only |
| `default` | Neutral surface background with border |
| `gradient` | Gradient background |

## Sizes

| Size | Height | Font | Padding |
|---|---|---|---|
| `xs` | 16px | 9px | 6px |
| `sm` | 18px | 10px | 8px |
| `md` | 20px | 11px | 10px |
| `lg` | 26px | 13px | 12px |
| `xl` | 32px | 16px | 16px |

## AI Translation Notes

- Default radius is `full` (pill shape). Can be overridden.
- The `dot` variant uses a `::before` pseudo-element for the dot indicator.
- For the `light` variant, use `color-mix()` to create a 12% tint of the color.
- The `gradient` variant uses a `linear-gradient` from primary to info.
- Text is uppercase with bold weight and 0.25px letter spacing.
