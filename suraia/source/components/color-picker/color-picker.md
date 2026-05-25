# ColorPicker

ColorPicker describes a framework-agnostic color selection surface with saturation, hue, optional alpha, and swatches.

## Dependencies

- HueSlider
- AlphaSlider
- ColorSwatch

## AI Translation Notes

- Treat saturation, hue, and alpha as separate accessible slider-like controls.
- Keep color conversion framework-local; the Suraia controller stores selected value, alpha, format, and swatch selection intent.
- Use `--suraia-color-picker-value` and `--suraia-color-picker-alpha` to style previews and alpha tracks.
- Swatch buttons must be keyboard-focusable and labelled by color name or color value.
