# Notification

A dismissible notification banner with icon, title, and message. Can auto-close after a delay.

## Dependencies
- CloseButton (optional)

## AI Translation Notes
- Default `light` variant uses a colored left border accent.
- `filled` inverts colors (white text on colored background).
- Notifications typically appear in a fixed-position container (top-right, bottom-right, etc.) managed by a notification system.
- `autoClose` is specified in milliseconds — uses `setTimeout` to auto-dismiss.
