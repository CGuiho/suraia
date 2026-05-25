# FileButton

Trigger button for file uploads.

## AI Translation Notes
- Keeps a hidden native `<input type="file">` in sync.
- Trigger button click should forward to `input.click()`.
- Listen to input `change` events and map chosen `FileList` back to controller `selectFiles()`.
