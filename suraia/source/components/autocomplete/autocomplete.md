# Autocomplete

An input component that provides a list of suggested values based on user typing. Suggestions are filtered matching the typed substring. Selecting a suggestion replaces the input value.

## Dependencies
- Input, Popover

## AI Translation Notes
- Implements ARIA `role="combobox"` on the input.
- Suggestion list utilizes `role="listbox"` with `role="option"` child elements.
- The input is fully editable and its value represents the component's state.
- Dynamic filtering updates the visible suggestions. Keyboard navigation with `ArrowDown`, `ArrowUp`, and `Enter` allows interacting with options.
