import { useMemo } from 'react';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { SPECIAL_COLORS } from '../../theme';

export const useColorModeValue = (lightValue: string, darkValue: string): string => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const value = useMemo(
    () =>
      colorScheme === 'light'
        ? SPECIAL_COLORS.includes(lightValue)
          ? theme.colors[lightValue]
          : lightValue
        : SPECIAL_COLORS.includes(darkValue)
        ? theme.colors[darkValue]
        : darkValue,
    [theme.colors, colorScheme, lightValue, darkValue]
  ) as string;
  return value;
};
