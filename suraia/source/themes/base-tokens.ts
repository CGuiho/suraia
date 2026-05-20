/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export {
  color,
  space,
  radius,
  border,
  fontFamily,
  fontSize,
  shadow,
  zIndex,
  transition,
}

const color = {
  primary: '#2563eb',
  onPrimary: '#ffffff',
  secondary: '#475569',
  onSecondary: '#ffffff',
} as const;

const space = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
} as const;

const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

const border = {
  none: '0px',
  sm: '1px',
  md: '2px',
  lg: '3px',
} as const;

const fontFamily = {
  sans: "system-ui, -apple-system, sans-serif",
  sansCondensed: "system-ui, -apple-system, sans-serif",
  sansExtraCondensed: "system-ui, -apple-system, sans-serif",
  serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

const fontSize = {
  xxs: '10px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
} as const;

const shadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
} as const;

const zIndex = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  mobileBar: 10,
  header: 10,
  cookies: 20,
  notification: 30,
  overlay: 400,
  modal: 200,
  max: 9999,
} as const;

const transition = {
  duration: {
    fast: '150ms',
    normal: '250ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;
