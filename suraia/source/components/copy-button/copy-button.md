# CopyButton

A utility button to copy text values to the clipboard.

## AI Translation Notes
- Renders as a standard unstyled or regular button.
- Listens to click events and invokes clipboard API `navigator.clipboard.writeText(value)`.
- Updates `data-suraia-copied` attribute for visual state transitions (e.g. checkmark icon).
