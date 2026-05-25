# MultiSelect

A dropdown input for selecting multiple values from a list of options, represented visually as pills. Supports option filtering, disabled states, removing items via Backspace, and standard keyboard navigation.

## Dependencies
- Input, Pill, Popover

## AI Translation Notes
- Implements ARIA `role="combobox"` on the container/input element.
- Selected items are rendered as `Pill` components inside the input container.
- Dropdown is `role="listbox"` with `role="option"` child elements.
- Active descendant transitions are mapped to option focus states (`data-suraia-hovered`).
- Pressing `Backspace` when the search input is empty removes the last selected value.
