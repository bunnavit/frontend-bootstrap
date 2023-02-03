import React, { ReactNode } from 'react';

import { Flex, Box, Alert, Title } from '@mantine/core';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Icon } from '../../assets/coreograph-logo.svg';
import { useColorModeValue } from '../../hooks/useColorModeValue';

type AccountPageLayoutProps = {
  children: ReactNode;
  title: string;
  errorMessage?: string;
  footerContent?: ReactNode;
};

const CONTAINER_WIDTH = { base: '100%', md: '80%', lg: '764px' };

export const AccountPageLayout = (props: AccountPageLayoutProps) => {
  const { title, children, errorMessage, footerContent } = props;

  const backgroundColor = useColorModeValue('sLightBlue', 'whiteAlpha.2');
  const footerBackgroundColor = useColorModeValue('sPink', 'sPalePink');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      mih="100vh"
      bg={backgroundColor}
    >
      {/* CONTAINER */}
      <Flex
        direction="column"
        align="center"
        w={CONTAINER_WIDTH}
        bg="white"
        sx={(theme) => ({
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderTop: '11px solid',
          borderTopColor: theme.colors.sYellow,
        })}
        p={{ base: 8, md: '50px 110px' }}
      >
        <Box w={{ base: '100%', sm: '80%', md: '447px' }}>
          <Icon />
        </Box>

        <Title color="black" mt={12} mb={8}>
          {title}
        </Title>

        {errorMessage && (
          <Alert icon={<FontAwesomeIcon icon={faCircleExclamation} />} color="red" mb={4}>
            {errorMessage}
          </Alert>
        )}

        <Flex direction="column" w="100%">
          {children}
        </Flex>
      </Flex>

      {/* FOOTER */}
      {footerContent !== undefined && (
        <Box
          w={CONTAINER_WIDTH}
          bg={footerBackgroundColor}
          sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
          p={{ base: 8, md: '32px 110px' }}
        >
          {footerContent}
        </Box>
      )}
    </Flex>
  );
};
