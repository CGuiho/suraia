# Grid

A 12-column flexbox grid layout. Each column specifies its span via `--suraia-col-span`.

## AI Translation Notes
- Uses flexbox with `flex-wrap: wrap`, not CSS Grid (to support older patterns and column-span semantics).
- Column width calculated as `(span / columns) * 100%` minus gutter compensation.
- Supports offset via `--suraia-col-offset` and order via `--suraia-col-order`.
- `grow` makes columns expand to fill available space.
