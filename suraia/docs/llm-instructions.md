# Suraia LLM Instructions: Color Alpha & Opacity Guidelines

This document provides architectural guidelines and code patterns for applying alpha/opacity modifications to colors in the `@guiho/suraia` library. Follow these rules to keep the library lean, consistent, and performant.

---

## 1. Color Palette Policy

To keep design tokens minimal and prevent bundle bloat, **do not define static opacity scales** (e.g. `0` to `9` levels) for standard colors (like gray, blue, red, primary, etc.). 

Only core, library-wide glassmorphism overlays are statically defined:
*   `glassLight` (White with alpha `0.05` to `0.50`)
*   `glassDark` (Black with alpha `0.05` to `0.50`)

For all other colors, generate opacity dynamically using the patterns below.

---

## 2. Opacity in CSS Stylesheets

Since CSS custom functions (like preprocessor functions) are not natively supported, use the browser-native `color-mix()` function in conjunction with Suraia's predefined alpha percentages.

### Predefined Alpha Variables
Located in `functions.css`:
*   `--suraia-alpha-10`: `10%`
*   `--suraia-alpha-20`: `20%`
*   `--suraia-alpha-30`: `30%`
*   `--suraia-alpha-40`: `40%`
*   `--suraia-alpha-50`: `50%`
*   `--suraia-alpha-60`: `60%`
*   `--suraia-alpha-70`: `70%`
*   `--suraia-alpha-80`: `80%`
*   `--suraia-alpha-90`: `90%`

### CSS Examples
Always mix the color token with `transparent` in the `srgb` color space:

```css
/* Apply 50% opacity to Suraia Blue 5 */
.suraia-element {
  background-color: color-mix(
    in srgb,
    var(--suraia-color-blue-5) var(--suraia-alpha-50),
    transparent
  );
}

/* Apply 20% opacity to a custom component property */
.suraia-card {
  border-color: color-mix(
    in srgb,
    var(--suraia-color-primary) var(--suraia-alpha-20),
    transparent
  );
}
```

---

## 3. Opacity in JavaScript / TypeScript

Use the `alpha()` utility function from `suraia/source/styles/functions.ts`. It parses the input format, applies the alpha channel, and returns the modified color in the same format.

### TypeScript API
```typescript
import { alpha } from './styles/functions';

// Signature:
// alpha(colorString: string, alphaValue: number): string
```

### Supported Formats & Behaviors

#### HEX Colors
Accepts short (`#rgb`, `#rgba`) and long (`#rrggbb`, `#rrggbbaa`) formats. **Short formats are normalized to full formats** before the alpha channel is applied.
```typescript
// #rgb format -> expands to 8-digit HEX
alpha('#fff', 0.5);          // returns "#ffffff80"

// #rgba format -> overrides existing alpha
alpha('#fff8', 0.2);         // returns "#ffffff33"

// #rrggbb format -> appends alpha
alpha('#ffffff', 0.5);       // returns "#ffffff80"

// #rrggbbaa format -> overrides existing alpha
alpha('#ffffff80', 0.2);     // returns "#ffffff33"
```

#### RGB / RGBA Colors
Accepts standard comma-separated and space-separated/slashed syntax.
```typescript
alpha('rgb(255, 255, 255)', 0.5);      // returns "rgba(255, 255, 255, 0.5)"
alpha('rgba(0, 128, 255, 0.8)', 0.2);  // returns "rgba(0, 128, 255, 0.2)"
alpha('rgb(0 0 0)', 1);                // returns "rgba(0, 0, 0, 1)"
```

#### HSL / HSLA Colors
Accepts standard comma-separated, space-separated/slashed syntax, and support for hue units.
```typescript
alpha('hsl(210, 100%, 50%)', 0.5);          // returns "hsla(210, 100%, 50%, 0.5)"
alpha('hsla(120, 50%, 30%, 0.8)', 0.2);     // returns "hsla(120, 50%, 30%, 0.2)"
alpha('hsl(210deg, 100%, 50%)', 0.5);       // returns "hsla(210deg, 100%, 50%, 0.5)"
```
