# Using Suraia With Vanilla, React, Arrow.js, and Remix SQL Generation

## Current Working Targets

Suraia is a blueprint library. The target project should install it as a devDependency, let an AI assistant read the blueprints, and then generate local framework code into the target application. The generated app should not import Suraia in production runtime code.

### Vanilla TypeScript

Use the Vanilla example at `example/vanilla`.

```bash
cd example/vanilla
bun install
bun run dev
bun run build
```

The Vanilla dev server defaults to `http://localhost:4101`.

The Vanilla example demonstrates:

- Bun dev server with hot reloading.
- Static HTML build with `bun build ./index.html`.
- Local TypeScript state and event handling.
- Generated-style components using `suraia-` classes and `data-suraia-*` attributes.

### React TypeScript

Use the React example at `example/react`.

```bash
cd example/react
bun install
bun dev
bun run typecheck
bun run build
bun start
```

The React dev server defaults to `http://localhost:4102`.

The React example follows Bun's React app shape:

- `src/index.ts` is the Bun server entry point.
- `src/frontend.tsx` is the browser React entry point.
- `src/App.tsx` contains target-owned generated React components.
- `src/index.html` is the static build entry used by Bun.

## Blueprint Consumption Protocol

For both working targets:

1. Read the requested component folder in `suraia/source/components/<component>/`.
2. Start with `<component>.json` and resolve dependencies.
3. Generate missing dependency components first.
4. Translate `<component>.structure.html` into target-native markup.
5. Copy or adapt `<component>.css` into local target styles.
6. Translate `<component>.ts` behavior into local Vanilla or React state and event handlers.
7. Preserve accessibility rules from `<component>.md` and JSON accessibility metadata.

## Later Target: Arrow.js

Arrow.js should use the same blueprint contract, but map component anatomy into Arrow templates and reactive bindings.

Planned output:

- Arrow template files generated from `.structure.html`.
- Reactive state and event handlers generated from controller `.ts` files.
- Local CSS copied from Suraia component CSS and token files.
- No production import from Suraia.

## Later Target: Remix SQL Generation

Remix SQL generation should treat Suraia UI blueprints as the front-end contract and generate route/data scaffolds only after UI dependencies are resolved.

Planned output:

- Route modules with loaders and actions.
- Local React components generated from Suraia blueprints.
- Typed SQL scaffolds for data-backed screens.
- Form actions that preserve validation and accessibility contracts.

## Verification Standard

Each example target should pass:

```bash
bun run typecheck
bun run build
```

For targets without a `typecheck` script, build must still compile TypeScript and fail on invalid generated code.
