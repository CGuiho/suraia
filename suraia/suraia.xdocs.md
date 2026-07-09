---
subject: suraia
description: 'AI-first UI blueprint library — `@guiho/suraia` npm package. Framework-agnostic component blueprints (HTML, CSS, behavior, accessibility) translatable into React, Remix, Vanilla, ArrowJS, and Web Components.'
parent: null
children:
  - suraia-source
  - suraia-preview
  - suraia-schemas
  - suraia-docs
files:
  package.json: 'npm package manifest — `@guiho/suraia`, exports, scripts (dev/build/binary/typecheck/preview), dependencies.'
  tsconfig.json: TypeScript compiler configuration for the package.
  CHANGELOG.md: Release changelog tracking version history.
  LICENSE.md: MIT license.
  MEMORY.md: 'AI agent memory — project conventions, context, and decision log.'
  mirror.config.toml: GUIHO Mirror configuration for automated versioning.
  jsr.json: JSR registry metadata for the package.
  .npmrc: npm registry configuration.
  bun.lock: Bun lockfile with resolved dependency versions.
documents:
  CHANGELOG.md: Release changelog.
  LICENSE.md: MIT license text.
  MEMORY.md: AI agent memory and project context.
tags:
  - ui
  - design-system
  - component-library
  - blueprint
keywords:
  - suraia
  - ui-blueprint
  - component-library
  - design-tokens
  - framework-agnostic
  - guiho
flags: []
status: draft
---

# suraia — Package Root

The `@guiho/suraia` package is the core of the suraia UI blueprint library.
It stores neutral, framework-agnostic component knowledge — HTML anatomy, CSS
classes, custom properties, data attributes, behavior controllers, and
accessibility contracts — that AI coding agents translate into target
frameworks.

## Key Sub-Modules

- **source/** — Component blueprints, global styles, and theme tokens.
- **preview/** — Interactive component playground (Vite + TypeScript).
- **schemas/** — JSON schemas for design tokens and component validation.
- **docs/** — Package-level LLM instructions for AI agents.
