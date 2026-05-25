# Text

A typography primitive for rendering body text. `Text` is the most fundamental text component — it renders a `<p>` or `<span>` element with configurable font size, line height, and text behavior.

## Dependencies

None — this is a Tier 1 Primitive.

## Variants

| Variant | Description |
|---|---|
| `text` | Standard text rendering (default) |
| `gradient` | Text with a gradient fill |

## Sizes

| Size | Font Size | Line Height |
|---|---|---|
| `xs` | `--suraia-font-size-xs` (12px) | 1.25 |
| `sm` | `--suraia-font-size-sm` (14px) | 1.375 |
| `md` | `--suraia-font-size-md` (16px) | 1.5 |
| `lg` | `--suraia-font-size-lg` (18px) | 1.625 |
| `xl` | `--suraia-font-size-xl` (20px) | 1.75 |

## Attributes

| Attribute | Type | Description |
|---|---|---|
| `truncate` | `"end"` \| `"start"` | Truncates text with ellipsis |
| `lineClamp` | `number` | Clamps text after N lines |
| `inline` | `boolean` | Sets line-height to 1 |
| `inherit` | `boolean` | Inherits font properties from parent |
| `span` | `boolean` | Renders as `<span>` instead of `<p>` |

## AI Translation Notes

- Default element is `<p>`. When `span` is true, render as `<span>`.
- Truncation uses `text-overflow: ellipsis` with `white-space: nowrap`.
- Line clamping uses `-webkit-line-clamp` (widely supported).
- Gradient variant uses `background-clip: text` — provide a `--suraia-text-gradient` CSS custom property for the gradient definition.
- The `inherit` mode is useful when Text is nested inside another component that controls typography.
