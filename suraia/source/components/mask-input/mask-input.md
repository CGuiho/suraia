# MaskInput

MaskInput formats raw text against a declarative input mask.

## Dependencies

- Input

## AI Translation Notes

- Supported mask tokens are `9` for digits, `a` for letters, and `*` for alphanumeric characters.
- Literals in the mask should be rendered automatically while editable positions use the configured placeholder character.
- Keep raw and formatted values distinct in generated framework code when the application needs both.
- Do not prevent ordinary text navigation, selection, copy, or paste behavior.
