# NumberFormatter

A visual primitive used to format numeric values based on localization, decimal config, percentages, currencies, and custom decorations (prefixes and suffixes).

## Dependencies

None — this is a Tier 1 Primitive.

## AI Translation Notes

- Formats values using browser-native `Intl.NumberFormat`.
- Standardize on wrapper span `.suraia-number-formatter` elements for inline display.
- Attributes allow control over currency codes, maximum fraction configurations, and custom strings.
