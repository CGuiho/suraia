# TagsInput

An input component that allows users to type freeform text values and add them as tags/pills. Supports split character delimiters (e.g. Comma), duplicate prevention, maximum tag count limits, disabled states, and keyboard navigation.

## Dependencies
- Input, Pill, PillsInput

## AI Translation Notes
- Implements ARIA `role="group"` on the container wrapper.
- Visual layout is based on the flow design of `PillsInput`.
- Freeform text entered by the user is added to the tag list upon receiving split characters or pressing `Enter`.
- Backspace deletes the last tag if the text input is currently empty.
