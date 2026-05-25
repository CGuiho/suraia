# Select

A dropdown select for choosing a single value. Supports search, clear, disabled options, and full keyboard navigation.

## Dependencies
- Input (shared wrapper CSS), Popover (conceptual positioning)

## AI Translation Notes
- Uses combobox ARIA pattern: `role="combobox"` on input, `role="listbox"` on dropdown, `role="option"` on each item.
- `aria-expanded` reflects open state, `aria-activedescendant` points to hovered option.
- When `searchable`, the input is editable and filters options.
- When not searchable, the input is `readonly`.
- Chevron rotates 180° when opened.
- Selected option shows primary-tinted background.
- Hovered option shows surface-hover background.
