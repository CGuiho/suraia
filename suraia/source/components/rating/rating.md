# Rating

A rating component to display and gather user rating feedback using interactive symbols (typically stars).

## AI Translation Notes
- Rating container has `role="radiogroup"`.
- Supports fractional fills (half stars, quarter stars, etc.) defined by `fractions`.
- Active display values are calculated dynamically using `getItemFillPercentage(itemIndex)`.
- If `highlightSelectedOnly` is true, only the symbol representing the rounded active value is filled.
- Supports keyboard navigation: Arrow Keys change the rating value by fractions.
- Hover states can be previewed/tracked with `hoverValue`.
