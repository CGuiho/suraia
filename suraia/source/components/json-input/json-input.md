# JsonInput

JsonInput is a textarea blueprint for editing JSON with parse validation and optional pretty-formatting.

## Dependencies

- Textarea

## AI Translation Notes

- Preserve multiline editing semantics and do not block intermediate invalid JSON while the user types.
- Use `parse()` for validation and `format()` for explicit or blur-triggered formatting.
- Connect parse errors to the textarea with `aria-describedby` and set `aria-invalid` only when the user-facing value is invalid.
- Use a monospace font and keep resize/autosize behavior idiomatic for the target framework.
