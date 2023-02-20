import { useMemo } from 'react';
import { useMantineColorScheme } from '@mantine/core';

export const useColorModeValue = (lightValue: string, darkValue: string): string => {
  const { colorScheme } = useMantineColorScheme();
  const value = useMemo(
    () => (colorScheme === 'light' ? lightValue : darkValue),
    [colorScheme, lightValue, darkValue]
  );
  return value;
};
