# Textarea

A multi-line text input. Reuses the shared input wrapper system from TextInput.

## Dependencies
- Input (shared wrapper CSS)

## AI Translation Notes
- Uses native `<textarea>` element with custom styling.
- `autosize` requires JS to adjust height on input — set `resize: none; overflow: hidden` and compute height from `scrollHeight`.
- `minRows`/`maxRows` constrain the autosize range.
- Shares `.suraia-input-wrapper`, `.suraia-input-label`, etc. from the TextInput CSS.
