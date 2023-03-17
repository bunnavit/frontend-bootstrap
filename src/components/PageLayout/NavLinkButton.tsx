import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton, Group, ThemeIcon, Text, createStyles } from '@mantine/core';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type NavigationLink = {
  label: string;
  icon: IconDefinition;
  to?: string;
  color?: string;
  onClick?: () => Promise<void>;
};

const useStyles = createStyles((theme) => ({
  match: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  default: {},
}));

export const NavLinkButton = (props: NavigationLink) => {
  const { to, icon, label, color, onClick } = props;
  const navigate = useNavigate();
  const { classes } = useStyles();

  const location = useLocation();

  const match = matchRoutes([{ path: `${to}/*` }, { path: to }], location);

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        },
      })}
      className={match ? classes.match : classes.default}
      onClick={() => (onClick ? onClick() : navigate(to ?? '/'))}
    >
      <Group>
        <ThemeIcon size="lg" color={color} variant="light">
          <FontAwesomeIcon size="1x" icon={icon} />
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};
