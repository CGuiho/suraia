/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export {
  contentWidth,
  containerPadding,
  gutter,
  sidebar,
  header,
  footer,
  scrollbar,
  overlay,
  focusRing,
  cursor,
  opacity,
}

const contentWidth = {
  xs: '540px',
  sm: '720px',
  md: '960px',
  lg: '1140px',
  xl: '1320px',
} as const;

const containerPadding = {
  xs: '16px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '32px',
} as const;

const gutter = '16px' as const;

const sidebar = {
  width: '260px',
  widthCollapsed: '60px',
} as const;

const header = {
  height: '60px',
} as const;

const footer = {
  height: '60px',
} as const;

const scrollbar = {
  width: '6px',
  color: 'rgba(0, 0, 0, 0.15)',
  hoverColor: 'rgba(0, 0, 0, 0.25)',
} as const;

const overlay = {
  color: 'rgba(0, 0, 0, 0.6)',
} as const;

const focusRing = {
  width: '2px',
  color: '#228be6',
  offset: '2px',
} as const;

const cursor = {
  disabled: 'not-allowed',
  pointer: 'pointer',
} as const;

const opacity = {
  disabled: 0.6,
  hover: 0.9,
} as const;
