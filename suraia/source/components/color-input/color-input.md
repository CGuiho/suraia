# ColorInput

ColorInput combines a text field, a visual swatch, validation, and an optional color picker trigger.

## Dependencies

- Input
- Popover
- ColorPicker
- ColorSwatch

## AI Translation Notes

- Preserve native text input behavior so users can paste or type any supported CSS color format.
- Use the controller to validate color strings and set `aria-invalid` when invalid.
- Generate the preview swatch from `--suraia-color-input-value`; invalid values should fall back to transparent.
- If a picker is generated, close it on Escape and keep focus management local to the disclosure.
