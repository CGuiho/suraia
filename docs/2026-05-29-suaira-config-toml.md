# Suaira Config TOML

Status: working draft. This document defines the first configuration contract for Suraia blueprint conversion.

## Filename And Location

The configuration file is named exactly:

```txt
suaira.config.toml
```

The file must live in the same directory as the target application's `package.json`.

Example:

```txt
example/react/
  package.json
  suaira.config.toml
  src/
```

The directory containing both `package.json` and `suaira.config.toml` is the package scope. All relative paths in the configuration file resolve from that package scope.

## Minimal File

The file may rely on defaults:

```toml
# suaira.config.toml
```

When fields are omitted, the assistant must apply the default read and write resolution rules below.

## Paths

The first configuration section is `paths`.

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraira"
```

### `paths.read`

`paths.read` tells the assistant where to read Suraia blueprints from.

Default:

```txt
node_modules/@guiho/suraia
```

Resolution rules:

1. If `paths.read` is present, resolve it from the package scope unless it is absolute.
2. If `paths.read` is omitted, use `<package-scope>/node_modules/@guiho/suraia`.
3. The resolved read path must contain Suraia blueprint files.
4. The assistant must check `library/components/<component>/` first.
5. If that path is not present, the assistant may check `source/components/<component>/` for local checkout, linked package, or unpublished package layouts.

### `paths.write`

`paths.write` tells the assistant where to write generated local components.

If `paths.write` is present, it is the final Suraia-owned local component directory. For React, generated component files go directly inside this directory.

Example:

```toml
[paths]
write = "src/suraira"
```

Result:

```txt
src/
  suraira/
    suraira-button.tsx
```

If `paths.write` is omitted, the assistant must select the default write directory using this order:

1. If `<package-scope>/source/` exists, use `<package-scope>/source/suraira/`.
2. Else if `<package-scope>/src/` exists, use `<package-scope>/src/suraira/`.
3. Else use `<package-scope>/suraira/`.

If both `source/` and `src/` exist, prefer `source/` and state that decision before writing files.

The assistant must not use a generic `components/` directory as the primary namespace for Suraia-generated components.

## React Output Rule

React conversion writes components into the resolved `paths.write` directory.

For a button, the default generated file is:

```txt
<resolved-write-directory>/suraira-button.tsx
```

The application imports the local generated component:

```tsx
import { SurairaButton } from "./suraira/suraira-button";
```

The application must not import React UI components from `@guiho/suraia` at runtime.

## Missing Config Behavior

The conversion process begins by loading `suaira.config.toml`.

If the file is missing, the assistant must stop and ask whether to create it in the package scope. The assistant may explain the defaults it would write, but must not silently continue without the configuration file.

Example default file content for an app that has `src/`:

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraira"
```

The `write` value in the default file should match the detected package layout. If `source/` exists, use `source/suraira`. If only `src/` exists, use `src/suraira`. If neither exists, use `suraira`.

## Current React Example

For `example/react`, the package scope is:

```txt
example/react/
```

Current observed state:

- `package.json` exists.
- `src/` exists.
- `source/` does not exist.
- `suaira.config.toml` does not exist.

Therefore, if a default config is created for this app today, its write path should be:

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraira"
```
