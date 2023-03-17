import React, { ReactNode } from 'react';

import { Flex, Box, Alert, Title, Text } from '@mantine/core';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Icon } from '../../assets/coreograph-logo.svg';
import { useColorModeValue } from '../../hooks/useColorModeValue';
import { themeColors } from '../../theme';

type AccountPageLayoutProps = {
  children: ReactNode;
  title: string;
  errorMessage?: string;
  footerContent?: ReactNode;
};

const CONTAINER_WIDTH = { base: '100%', md: '80%', lg: '764px' };

export const AccountPageLayout = (props: AccountPageLayoutProps) => {
  const { title, children, errorMessage, footerContent } = props;

  const backgroundColor = useColorModeValue(
    themeColors.sLightBlue,
    themeColors.whiteAlpha[2]
  );

  const footerBackgroundColor = useColorModeValue(
    themeColors.sPink,
    themeColors.sPalePink
  );

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
        sx={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderTop: '11px solid',
          borderTopColor: themeColors.sYellow,
        }}
        p={{ base: 40, md: '50px 110px' }}
      >
        <Box w={{ base: '80%', sm: '60%', md: '447px' }}>
          <Icon />
        </Box>

        <Title mt={24} mb={16} weight="bold">
          {title}
        </Title>

        {errorMessage && (
          <Alert
            variant="filled"
            pt={15}
            icon={<FontAwesomeIcon icon={faCircleExclamation} size="lg" color="tomato" />}
            color="red.2"
            fz="lg"
            mb={10}
          >
            <Text fz="md" color="black">
              {errorMessage}
            </Text>
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
          p={{ base: '2rem', md: '32px 110px' }}
        >
          {footerContent}
        </Box>
      )}
    </Flex>
  );
};
