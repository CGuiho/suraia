# PinInput

OTP or PIN layout code inputs.

## AI Translation Notes
- Renders as a row container of individual `<input type="text" maxlength="1">` elements.
- Uses `inputmode="numeric"` when type is set to numeric.
- Map paste events: if pasting a multi-character string, parse the paste and set values sequentially.
- Automatically handle cursor focus forwarding when typing or pressing Backspace.
