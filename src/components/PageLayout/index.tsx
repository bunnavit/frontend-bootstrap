import React, { ReactNode, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  Group,
  Stack,
} from '@mantine/core';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/pro-solid-svg-icons';

import { ReactComponent as Icon } from '../../assets/coreograph-icon.svg';
import { useUserContext } from '../../context/useUserContext';
import { NavigationLink, NavLinkButton } from './NavLinkButton';

type PageLayoutProps = {
  navigationLinks: NavigationLink[];
  children: ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
  const { navigationLinks, children } = props;

  const { logOut, isAuthed } = useUserContext();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow={true}>
            {navigationLinks.map((navigationLink) => (
              <NavLinkButton key={navigationLink.label} {...navigationLink} />
            ))}
          </Navbar.Section>

          <Navbar.Section mb={10}>
            <Stack justify="center">
              {isAuthed ? (
                <NavLinkButton
                  label="Log out"
                  icon={faRightFromBracket}
                  onClick={() => logOut()}
                  color="red"
                />
              ) : (
                <NavLinkButton
                  label="Log in"
                  icon={faRightToBracket}
                  to="/login"
                  color="blue"
                />
              )}
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50 }} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Group>
              <Box w="xl">
                <Icon />
              </Box>
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Text>Demo</Text>
              </MediaQuery>
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
