# Suraia Config TOML

Status: working draft. This document defines the first configuration contract for Suraia blueprint conversion.

## Filename And Location

The configuration file is named exactly:

```txt
suraia.config.toml
```

The file must live in the same directory as the target application's `package.json`.

Example:

```txt
example/react/
  package.json
  suraia.config.toml
  src/
```

The directory containing both `package.json` and `suraia.config.toml` is the package scope. All relative paths in the configuration file resolve from that package scope.

## Minimal File

The file may rely on defaults:

```toml
# suraia.config.toml
```

When fields are omitted, the assistant must apply the default read and write resolution rules below.

## Paths

The first configuration section is `paths`.

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraia"
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
write = "src/suraia"
```

Result:

```txt
src/
  suraia/
    suraia-button.tsx
    suraia-button.modules.css
```

If `paths.write` is omitted, the assistant must select the default write directory using this order:

1. If `<package-scope>/source/` exists, use `<package-scope>/source/suraia/`.
2. Else if `<package-scope>/src/` exists, use `<package-scope>/src/suraia/`.
3. Else use `<package-scope>/suraia/`.

If both `source/` and `src/` exist, prefer `source/` and state that decision before writing files.

The assistant must not use a generic `components/` directory as the primary namespace for Suraia-generated components.

## React Output Rule

React conversion writes components into the resolved `paths.write` directory.

For a button, the default generated files are:

```txt
<resolved-write-directory>/suraia-button.tsx
<resolved-write-directory>/suraia-button.modules.css
```

The application imports the local generated component:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

The application must not import React UI components from `@guiho/suraia` at runtime.

## React File Naming And Structure

Generated React files use the blueprint slug as kebab-case with the `suraia-` prefix.

For a blueprint slug named `component-log-name`, create:

```txt
suraia-component-log-name.tsx
suraia-component-log-name.modules.css
```

The component symbol is PascalCase with the `Suraia` prefix:

```txt
SuraiaComponentLogName
```

The generated `.tsx` file order is:

1. Import block.
2. Export block, including `export default` when applicable.
3. Props interface and component implementation.

Use this shape:

```tsx
import type { ReactNode } from "react";
import classes from "./suraia-component-log-name.modules.css";

export type { Props };
export { SuraiaComponentLogName };
export default SuraiaComponentLogName;

interface Props {
  children?: ReactNode;
}

function SuraiaComponentLogName(props: Props) {
  return <div className={classes.root}>{props.children}</div>;
}
```

Do not inline exports on function or constant declarations. Use `interface Props` for component props, import the CSS module as `classes`, and implement the component with a TypeScript `function` declaration.

If the component needs another generated Suraia component, import it with the configured alias:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

Before generating a component, check whether the expected `.tsx` file and `.modules.css` file already exist in the resolved write directory.

If both files already exist, the component is already written in React. Report that to the user and stop for that component unless the user explicitly requested override/overwrite/regeneration.

If only one expected file exists, treat it as a partial existing conversion. Report the partial state and stop unless the user explicitly requested override/overwrite/regeneration.

If the user explicitly requested override, overwrite both generated files.

When a dependency component already exists locally, import it through `#suraia/*` instead of regenerating it.

## Missing Config Behavior

The conversion process begins by loading `suraia.config.toml`.

If the file is missing, the assistant should not stop the workflow. It should tell the user that the configuration file is missing, create a default configuration file in the package scope, and continue.

Use this message shape:

```txt
I don't see `suraia.config.toml` beside this app's `package.json`. I'm going to create a default configuration file and continue.
```

Example default file content for an app that has `src/`:

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraia"
```

The `write` value in the default file should match the detected package layout. If `source/` exists, use `source/suraia`. If only `src/` exists, use `src/suraia`. If neither exists, use `suraia`.

## TypeScript Import Alias

React conversion should prefer a global project import alias for generated Suraia files.

Preferred alias:

```txt
#suraia/*
```

The alias target should match the resolved write directory from `paths.write`.

Example for a React app with `write = "src/suraia"`:

```json
{
  "compilerOptions": {
    "paths": {
      "#suraia/*": ["./src/suraia/*"]
    }
  }
}
```

Example import:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

If `tsconfig.json` is present, the assistant should add `#suraia/*` when it is missing and preserve existing path aliases. If no `tsconfig.json` is present, the assistant should use the project's existing import mechanism when one exists. If no global import mechanism exists, use relative imports as the fallback.

## Current React Example

For `example/react`, the package scope is:

```txt
example/react/
```

Current observed state:

- `package.json` exists.
- `src/` exists.
- `source/` does not exist.
- `suraia.config.toml` exists.
- `tsconfig.json` exists.
- `tsconfig.json` has an existing `@/*` alias.
- `tsconfig.json` has `#suraia/*`.
- `package.json` lists `@guiho/suraia` as a local file devDependency.
- `node_modules/@guiho/suraia/library/components/button/` is present in the current workspace.

The current config write path is:

```toml
[paths]
read = "node_modules/@guiho/suraia"
write = "src/suraia"
```

The matching TypeScript alias should be:

```json
"#suraia/*": ["./src/suraia/*"]
```

A button component generated in this app should be created as:

```txt
example/react/src/suraia/suraia-button.tsx
example/react/src/suraia/suraia-button.modules.css
```
