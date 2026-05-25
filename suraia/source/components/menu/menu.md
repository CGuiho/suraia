# Menu

A dropdown menu triggered by a button or custom target element.

## AI Translation Notes
- Trigger sets `aria-haspopup="true"` and `aria-expanded`.
- Dropdown uses `role="menu"`, items use `role="menuitem"`.
- Items can have icons (left), labels, and keyboard shortcuts (right section).
- Labels are section headings (not interactive).
- Dividers separate groups.
- `data-suraia-color="error"` turns item red for destructive actions.
- Focus management: ArrowDown/Up navigates items, Enter activates, Escape closes.
