import { MantineThemeColorsOverride, MantineThemeOverride } from '@mantine/core';

export const themeColors = {
  // Positive buttons/calls-to-action
  blue: [
    '#dcf7ff',
    '#b4e3fc',
    '#89cff4',
    '#5cbbed',
    '#32a8e7',
    '#188dcb',
    '#0a6fa1',
    '#004f74',
    '#003148',
    '#00121e',
  ],
  sYellow: '#febf08',
  sPink: '#e9308f',
  sPalePink: '#f58bc2',
  // Help/support
  sTeal: '#0ec0c7',
  // App background
  sLightBlue: '#eff5fb',
  // Editor (GoJS canvas) background
  sDarkBlue: '#24293a',
  // chakra defaults
  whiteAlpha: [
    'rgba(255, 255, 255, 0.04)',
    'rgba(255, 255, 255, 0.06)',
    'rgba(255, 255, 255, 0.08)',
    'rgba(255, 255, 255, 0.16)',
    'rgba(255, 255, 255, 0.24)',
    'rgba(255, 255, 255, 0.36)',
    'rgba(255, 255, 255, 0.48)',
    'rgba(255, 255, 255, 0.64)',
    'rgba(255, 255, 255, 0.80)',
    'rgba(255, 255, 255, 0.92)',
  ],
  blackAlpha: [
    'rgba(0, 0, 0, 0.04)',
    'rgba(0, 0, 0, 0.06)',
    'rgba(0, 0, 0, 0.08)',
    'rgba(0, 0, 0, 0.16)',
    'rgba(0, 0, 0, 0.24)',
    'rgba(0, 0, 0, 0.36)',
    'rgba(0, 0, 0, 0.48)',
    'rgba(0, 0, 0, 0.64)',
    'rgba(0, 0, 0, 0.80)',
    'rgba(0, 0, 0, 0.92)',
  ],
} as const;

export const theme: MantineThemeOverride = {
  fontFamily: 'Quicksand, sans-serif',
  headings: {
    fontFamily: 'Raleway, sans-serif',
  },
  fontFamilyMonospace: 'Ubuntu Mono, monospace',
  fontSizes: {
    xs: 13,
    sm: 15,
    md: 17,
    lg: 19,
    xl: 23,
  },
  colors: themeColors as MantineThemeColorsOverride,
};
