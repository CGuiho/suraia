# React Blueprint Conversion Instructions

Status: working draft. This document captures the agreed React conversion workflow as it is being defined.

## Purpose

These instructions are for an AI assistant converting `@guiho/suraia` component blueprints into local React components inside a target application.

Suraia is a blueprint library, not a runtime React component package. The target React app must not import production UI from `@guiho/suraia`. The AI reads Suraia blueprints during development, generates local React code, and the application imports those local files.

## Local Component Ownership Rule

Before a Suraia-derived component is used anywhere in the React application, that component must exist as a local generated file inside a Suraia-owned directory in the target app.

Do not place generated Suraia components in a generic `components/` directory as the primary namespace.

Use a library-named directory instead. For the current React implementation direction, the preferred shape is:

```txt
./app/
  suraia/
    suraia-button.tsx
    suraia-button.modules.css
```

If the target React app does not use an `app/` directory, map `./app/` to the app's source root while preserving the library-owned namespace. For example, a Bun React app using `src/` can use:

```txt
./src/
  suraia/
    suraia-button.tsx
    suraia-button.modules.css
```

A page, route, or application shell may import a button only after the button has been generated locally:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

The bad pattern is defining `GeneratedButton` inline inside `App.tsx` and treating that as a Suraia implementation. The correct pattern is to generate the Suraia-derived button first, place it in the Suraia-owned local directory, and then import it into `App.tsx`.

## Step 1: Load The Configuration File

The first operational step is to load the Suraia conversion configuration file.

1. Identify the target React app root.
   - Example: `/c/GUIHO/suraia/example/react`.
   - The target app root is the directory containing the target app's `package.json`.
   - Run package-manager commands from this app root, not from an unrelated parent directory.

2. Load `suraia.config.toml` from the same directory as `package.json`.
   - The config file must be in the package scope.
   - All relative paths in the config resolve from the package scope.
   - See `docs/2026-05-29-suraia-config-toml.md` for the configuration contract.

3. If `suraia.config.toml` is missing, tell the user, create a default config file, and continue.
   - Do not interrupt the workflow to ask permission for the default config.
   - Use this message shape:

     ```txt
     I don't see `suraia.config.toml` beside this app's `package.json`. I'm going to create a default configuration file and continue.
     ```

   - The default config must use the default read path and the write path selected from the detected package layout.

4. Resolve the Suraia blueprint read path.
   - Use `paths.read` from the config when present.
   - Otherwise default to `node_modules/@guiho/suraia`.
   - Resolve relative paths from the package scope.

5. Resolve the local component write directory.
   - Use `paths.write` from the config when present.
   - Otherwise choose the default write directory:
     - `<package-scope>/source/suraia/` when `source/` exists.
     - `<package-scope>/src/suraia/` when `source/` does not exist and `src/` exists.
     - `<package-scope>/suraia/` when neither `source/` nor `src/` exists.
   - If both `source/` and `src/` exist, prefer `source/` and state that decision before writing files.

6. Before converting a component, state the final write path.
   - For a button, this should resolve to a path like:

     ```txt
     <resolved-write-directory>/suraia-button.tsx
     ```

## Step 2: Ensure The Suraia Blueprint Package Is Installed

After loading configuration and resolving paths, ensure the Suraia blueprint package is available.

1. Read the target app's `package.json`.
   - Confirm whether `@guiho/suraia` is listed in `devDependencies`.
   - It must be a development dependency because Suraia is used as an AI-readable blueprint source, not as production runtime UI.

2. Check whether the resolved `paths.read` location exists.
   - When `paths.read` is omitted, the default installed package path is:

     ```txt
     node_modules/@guiho/suraia/
     ```

   - Expected package shape after installation:

     ```txt
     @guiho/suraia/
       library/
         components/
         styles/
         themes/
     ```

   - When working against a local checkout, a development link, or an unpublished package shape, the assistant may also find source blueprints under:

     ```txt
     <resolved-read-path>/source/components/
     ```

3. Confirm that the requested component blueprint exists.
   - For a button, check one of these paths:

     ```txt
     <resolved-read-path>/library/components/button/
     <resolved-read-path>/source/components/button/
     ```

   - The component blueprint folder should contain the blueprint files, such as `.json`, `.structure.html`, `.css`, `.ts`, and `.md`.

4. If the package and blueprint are present, state that discovery succeeded.
   - Use a clear confirmation such as:

     ```txt
     OK, @guiho/suraia is installed and the button blueprint is available.
     ```

5. If `node_modules` cannot be accessed, stop and ask the user for access.
   - Do not invent the blueprint.
   - Do not continue from memory alone.
   - Ask for the minimum needed access to inspect the target app's `node_modules/@guiho/suraia` directory.

6. If `@guiho/suraia` is not installed, ask before installing.
   - Do not install automatically.
   - Say:

     ```txt
     I don't see @guiho/suraia installed in this React app. Should I run `bun add -d @guiho/suraia` from the app root?
     ```

7. If the user approves installation, run the install command from the target React app root.

   ```bash
   bun add -d @guiho/suraia
   ```

8. After installation, verify again.
   - Re-check `package.json`.
   - Re-check `node_modules/@guiho/suraia`.
   - Re-check the expected blueprint folder for the requested component.

9. If repeated verification still fails, stop and report the exact problem.
    - State what was checked.
    - State what was missing.
    - Include the instructions written so far so the user can correct the environment and continue.

## Step 3: Run General Project Verification

Before writing React code, verify the local generation target, package setup, and project import path.

1. Verify the local component output path.
   - Use the `paths.write` value resolved during config loading.
   - Ensure the write directory is Suraia-owned, such as `src/suraia/` or `suraia/`.
   - Do not write generated Suraia components into a generic `components/` directory as the primary namespace.
   - If the write directory does not exist, create it when generation begins.
   - For the button component, create the React file at:

     ```txt
     <resolved-write-directory>/suraia-button.tsx
     ```

   - Create the matching CSS module file at:

     ```txt
     <resolved-write-directory>/suraia-button.modules.css
     ```

2. Verify the TypeScript import alias.
   - If `tsconfig.json` exists in the package scope, inspect `compilerOptions.paths`.
   - Prefer a global alias for Suraia-generated files:

     ```json
     {
       "compilerOptions": {
         "paths": {
           "#suraia/*": ["./src/suraia/*"]
         }
       }
     }
     ```

   - The alias target must match the resolved write directory.
   - If the resolved write directory is `source/suraia`, use:

     ```json
     "#suraia/*": ["./source/suraia/*"]
     ```

   - If the resolved write directory is `suraia`, use:

     ```json
     "#suraia/*": ["./suraia/*"]
     ```

   - Preserve existing aliases. Add `#suraia/*` when it is missing.

3. Prefer global imports in generated React code.
   - With the alias present, import the local component like this:

     ```tsx
     import { SuraiaButton } from "#suraia/suraia-button";
     ```

   - If `tsconfig.json` is not present, use the project's existing import mechanism when one exists.
   - If no global import mechanism exists, use relative imports as the fallback.

4. Report the verification result briefly.
   - State whether the config was loaded or created.
   - State whether `@guiho/suraia` is installed.
   - State the resolved blueprint read path.
   - State the resolved component write path.
   - State whether the `#suraia/*` alias exists or was added.

After this verification, the React application imports generated local files and uses them from application code. It must not import production UI from `@guiho/suraia`.

## Step 4: Create The React Component And Style Files

After configuration, package installation, and project verification are complete, create both generated files for the requested component.

For a blueprint with the kebab-case slug `component-log-name`, create:

```txt
<resolved-write-directory>/suraia-component-log-name.tsx
<resolved-write-directory>/suraia-component-log-name.modules.css
```

The exported component name must be:

```txt
SuraiaComponentLogName
```

Before creating files, check the resolved write directory:

1. Look for the component file:

   ```txt
   <resolved-write-directory>/suraia-component-log-name.tsx
   ```

2. Look for the CSS module file:

   ```txt
   <resolved-write-directory>/suraia-component-log-name.modules.css
   ```

3. If both files already exist and the user did not explicitly request override, report that the component is already written in React and stop for that component.

   Use this message shape:

   ```txt
   `SuraiaComponentLogName` is already written in React at `<resolved-write-directory>/suraia-component-log-name.tsx`.
   ```

4. If only one of the two files exists, treat this as a partial existing conversion. Report which file exists and which file is missing, then stop unless the user explicitly requested override.

5. If the user explicitly requested override, overwrite both generated files and continue.

The same check applies to dependency components. When a dependency is already written locally, import it through the configured alias instead of regenerating it:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

Generated React component files must follow this file order:

1. Import block.
2. Export block, including `export default` when applicable.
3. Component types and implementation logic.

Do not inline exports on the function or constant declaration. Use a top export block instead:

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

Use `Props` as the component props interface name. If the component has no public props yet, define `interface Props {}`.

Always import the component CSS module as `classes`.

If a generated component depends on another generated Suraia component, import it through the configured alias:

```tsx
import { SuraiaButton } from "#suraia/suraia-button";
```

## Current React Example Status

As of this draft:

- `example/react/package.json` lists `@guiho/suraia` as a local file devDependency.
- `example/react/node_modules/@guiho/suraia/library/components/button/` is present in the current workspace.
- `example/react/suraia.config.toml` exists.
- `example/react/src/` exists.
- The configured write directory is `example/react/src/suraia/`.
- A button component generated in this app should be written to `example/react/src/suraia/suraia-button.tsx`.
- Its CSS module should be written to `example/react/src/suraia/suraia-button.modules.css`.
- `example/react/tsconfig.json` exists.
- `example/react/tsconfig.json` has `@/*` and `#suraia/*`.
- The configured Suraia alias is `"#suraia/*": ["./src/suraia/*"]`.
