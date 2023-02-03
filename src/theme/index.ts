import { MantineThemeColorsOverride, MantineThemeOverride } from '@mantine/core';

export const SPECIAL_COLORS = [
  'sYellow',
  'sPink',
  'sPalePink',
  'sTeal',
  'sLightBlue',
  'sDarkBlue',
];

const colors: MantineThemeColorsOverride = {
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
    '#ffffff0a',
    '#ffffff0f',
    '#ffffff14',
    '#ffffff29',
    '#ffffff3d',
    '#ffffff5c',
    '#ffffff7a',
    '#ffffffa3',
    '#ffffffcc',
    '#ffffffeb',
  ],
};

export const theme: MantineThemeOverride = {
  fontFamily: 'Quicksand, sans-serif',
  headings: {
    fontFamily: 'Raleway, sans-serif',
  },
  fontFamilyMonospace: 'Ubuntu Mono, monospace',
  colors,
};
