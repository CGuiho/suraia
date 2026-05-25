# Combobox

An editable input combined with a dropdown listbox for selecting a value from a predefined list of options. It supports custom values, option filtering, disabled states, and standard keyboard navigation.

## Dependencies
- Input, Popover

## AI Translation Notes
- Implements ARIA `role="combobox"` on the input element.
- The input filters the options in the dropdown listbox (`role="listbox"`, containing `role="option"` elements).
- Selected options receive the `data-suraia-selected` attribute.
- Accessible keyboard navigation is managed using standard event handlers mapping to `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, `Home`, and `End`.
