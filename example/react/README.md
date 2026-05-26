# Suraia React TypeScript Example

This example follows Bun's React app structure: a Bun server entry point, a React browser entry point, and a static HTML build target.

## Run

```bash
bun install
bun dev
```

The dev server defaults to `http://localhost:4102`.

## Verify

```bash
bun run typecheck
bun run build
```

## Production

```bash
bun start
```

## What This Demonstrates

- Bun-native React dev server with hot reloading.
- A static build through `bun build ./src/index.html`.
- Local generated React components rather than production imports from Suraia.
- Loading, empty, success, error, dialog, form validation, tab, progress, and toast states.
