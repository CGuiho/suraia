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
  suraira/
    suraira-button.tsx
```

If the target React app does not use an `app/` directory, map `./app/` to the app's source root while preserving the library-owned namespace. For example, a Bun React app using `src/` can use:

```txt
./src/
  suraira/
    suraira-button.tsx
```

A page, route, or application shell may import a button only after the button has been generated locally:

```tsx
import { SurairaButton } from "./suraira/suraira-button";
```

The bad pattern is defining `GeneratedButton` inline inside `App.tsx` and treating that as a Suraia implementation. The correct pattern is to generate the Suraia-derived button first, place it in the Suraia-owned local directory, and then import it into `App.tsx`.

## Step 1: Load The Configuration File

The first operational step is to load the Suraia conversion configuration file.

1. Identify the target React app root.
   - Example: `/c/GUIHO/suraira/example/react`.
   - The target app root is the directory containing the target app's `package.json`.
   - Run package-manager commands from this app root, not from an unrelated parent directory.

2. Load `suaira.config.toml` from the same directory as `package.json`.
   - The config file must be in the package scope.
   - All relative paths in the config resolve from the package scope.
   - See `docs/2026-05-29-suaira-config-toml.md` for the configuration contract.

3. If `suaira.config.toml` is missing, stop and ask whether to create it.
   - Do not silently continue without the config file.
   - Explain the default `read` and `write` values that would be used for that package layout.

4. Resolve the Suraia blueprint read path.
   - Use `paths.read` from the config when present.
   - Otherwise default to `node_modules/@guiho/suraia`.
   - Resolve relative paths from the package scope.

5. Resolve the local component write directory.
   - Use `paths.write` from the config when present.
   - Otherwise choose the default write directory:
     - `<package-scope>/source/suraira/` when `source/` exists.
     - `<package-scope>/src/suraira/` when `source/` does not exist and `src/` exists.
     - `<package-scope>/suraira/` when neither `source/` nor `src/` exists.
   - If both `source/` and `src/` exist, prefer `source/` and state that decision before writing files.

6. Before converting a component, state the final write path.
   - For a button, this should resolve to a path like:

     ```txt
     <resolved-write-directory>/suraira-button.tsx
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

## Step 3: Verify The Local Component Output Path

Before writing React code, verify where the component will be created.

1. Use the `paths.write` value resolved during config loading.
2. Ensure the write directory is Suraia-owned, such as `src/suraira/` or `suraira/`.
3. Do not write generated Suraia components into a generic `components/` directory as the primary namespace.
4. If the write directory does not exist, create it when generation begins.
5. For the button component, create the React file at:

   ```txt
   <resolved-write-directory>/suraira-button.tsx
   ```

6. The React application imports this local file and uses it from application code.

## Current React Example Status

As of this draft:

- `example/react/package.json` does not list `@guiho/suraia`.
- `example/react/node_modules/@guiho/suraia` is not present.
- `example/react/suaira.config.toml` is not present.
- `example/react/src/` exists.
- The default write directory for this app would be `example/react/src/suraira/`.
- No install command has been run for this instruction-writing pass.
