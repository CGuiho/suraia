# Transition

Transition resolves mounted state into deterministic transition attributes and CSS custom properties.

## Dependencies

None - Tier 1 Primitive.

## AI Translation Notes

- Use the controller to derive `entered` and `exited` states from mounted state.
- Respect `keepMounted` when target framework code should leave exited content in the DOM.
- Apply generated styles through `--suraia-transition-duration`, `--suraia-transition-timing-function`, `--suraia-transition-opacity`, and `--suraia-transition-transform`.
- Generated code may add asynchronous entering/exiting phases if the target framework requires animation lifecycle callbacks.
