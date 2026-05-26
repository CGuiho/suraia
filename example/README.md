# Suraia Examples

The examples show what a target application looks like after an AI assistant reads Suraia blueprints and generates local framework code.

## Active Examples

| Target | Path | Runtime | Status |
|---|---|---|---|
| Vanilla TypeScript | `example/vanilla` | Bun dev server + Bun static HTML build | Working |
| React TypeScript | `example/react` | Bun React dev server + Bun static HTML build | Working |

## Later Targets

| Target | Path | Status |
|---|---|---|
| Arrow.js | `example/arrow-js` | Planned |
| Remix SQL generation | `example/remix` | Planned |

## Commands

Run commands inside the example you want to test.

```bash
cd example/vanilla
bun install
bun run dev
bun run build
```

Vanilla runs on `http://localhost:4101` by default.

```bash
cd example/react
bun install
bun dev
bun run typecheck
bun run build
```

React runs on `http://localhost:4102` by default.
