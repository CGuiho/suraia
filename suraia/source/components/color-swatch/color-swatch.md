# ColorSwatch

Displays a color preview with customizable shape, size, shadow, and optional indicator slot.

## AI Translation Notes
- Renders as a circular or rounded color preview box.
- The `color` is applied as an inline style `background-color`.
- Use the `default` slot to show a checkmark or other indicator inside the swatch.
- Uses `color-mix` with `var(--suraia-alpha-10)` to apply a subtle inset border/shadow for light colors when `withShadow` is enabled.
