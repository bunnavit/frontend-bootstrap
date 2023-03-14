import React from 'react';
import { Center, Loader, Stack, Text } from '@mantine/core';

type CustomLoaderProps = {
  message?: string;
};

export const CustomLoader = (props: CustomLoaderProps) => {
  const { message } = props;
  return (
    <Center w="100%" h="100%">
      <Stack align="center">
        <Loader size="xl" />
        {message && <Text>{message}</Text>}
      </Stack>
    </Center>
  );
};
