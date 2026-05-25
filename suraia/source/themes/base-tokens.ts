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
  fontWeight,
  lineHeight,
  heading,
  componentSize,
  breakpoint,
  surface,
  shadow,
  zIndex,
  transition,
}

const color = {
  primary: '#7950f2',
  onPrimary: '#ffffff',
  secondary: '#4a5167',
  onSecondary: '#ffffff',
  error: '#fa5252',
  onError: '#ffffff',
  success: '#40c057',
  onSuccess: '#ffffff',
  warning: '#fab005',
  onWarning: '#ffffff',
  info: '#228be6',
  onInfo: '#ffffff',
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

const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

const lineHeight = {
  xs: 1.25,
  sm: 1.375,
  md: 1.5,
  lg: 1.625,
  xl: 1.75,
} as const;

const heading = {
  h1: { fontSize: '34px', lineHeight: 1.25, fontWeight: 700 },
  h2: { fontSize: '26px', lineHeight: 1.3, fontWeight: 700 },
  h3: { fontSize: '22px', lineHeight: 1.35, fontWeight: 700 },
  h4: { fontSize: '18px', lineHeight: 1.4, fontWeight: 700 },
  h5: { fontSize: '16px', lineHeight: 1.45, fontWeight: 700 },
  h6: { fontSize: '14px', lineHeight: 1.5, fontWeight: 700 },
} as const;

const componentSize = {
  xs: '30px',
  sm: '36px',
  md: '42px',
  lg: '50px',
  xl: '60px',
} as const;

const breakpoint = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1408px',
} as const;

const surface = {
  light: {
    background: '#ffffff',
    foreground: '#1a1b1e',
    foregroundMuted: '#868e96',
    border: '#dee2e6',
    borderMuted: '#e9ecef',
    surface0: '#ffffff',
    surface1: '#f8f9fa',
    surface2: '#f1f3f5',
    hover: '#f8f9fa',
    active: '#f1f3f5',
  },
  dark: {
    background: '#1a1b1e',
    foreground: '#f1f3f5',
    foregroundMuted: '#909296',
    border: '#373a40',
    borderMuted: '#2c2e33',
    surface0: '#1a1b1e',
    surface1: '#25262b',
    surface2: '#2c2e33',
    hover: '#25262b',
    active: '#2c2e33',
  },
} as const;

const shadow = {
  none: 'none',
  xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 10px 15px -5px, rgba(0, 0, 0, 0.04) 0 7px 7px -5px',
  md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px',
  lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 28px 23px -7px, rgba(0, 0, 0, 0.04) 0 12px 12px -7px',
  xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 36px 28px -7px, rgba(0, 0, 0, 0.04) 0 17px 17px -7px',
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
    slow: '400ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
