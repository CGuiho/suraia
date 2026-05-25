# NumberInput
A numeric input with up/down control buttons for incrementing/decrementing.

## AI Translation Notes
- Uses `type="text"` with `inputmode="decimal"` (not `type="number"`) for better cross-browser control.
- `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Up/down controls have `tabindex="-1"` to keep single tab stop.
- ArrowUp/Down keys increment/decrement.
