# Title

A heading component that renders semantic `<h1>` through `<h6>` elements. The `order` prop controls the HTML element used, while the optional `size` prop allows visual size to differ from the semantic level.

## Dependencies

None — this is a Tier 1 Primitive.

## Order vs Size

- **`order`** determines the **semantic** heading level (`<h1>`, `<h2>`, etc.) — important for accessibility and document outline.
- **`size`** optionally overrides the **visual** appearance. For example, `order=2 size="h4"` renders an `<h2>` element styled like an `<h4>`.

If `size` is not provided, the visual size matches the order.

## Heading Sizes (from tokens)

| Level | Font Size | Line Height | Weight |
|---|---|---|---|
| h1 | 34px | 1.25 | 700 |
| h2 | 26px | 1.3 | 700 |
| h3 | 22px | 1.35 | 700 |
| h4 | 18px | 1.4 | 700 |
| h5 | 16px | 1.45 | 700 |
| h6 | 14px | 1.5 | 700 |

## AI Translation Notes

- Always render the heading tag matching `order` (e.g., `order=3` → `<h3>`).
- Apply `data-suraia-size` only when an explicit size override is provided.
- Use the heading design tokens for font metrics.
