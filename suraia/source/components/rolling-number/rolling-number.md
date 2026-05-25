# RollingNumber

A visual primitive for displaying numbers with an animated odometer/ticker roll effect when values change.

## Dependencies

None — this is a Tier 1 Primitive.

## AI Translation Notes

- Uses CSS custom variables `--suraia-rolling-duration` to align transition timing with state variables.
- Split target numbers into lists of digits. Each digit has a track containing `0-9` stacked vertically.
- Slide track vertically by updating `-10% * digitValue` as CSS translations.
- Perfect for dynamic dashboards, clocks, and score displays.
