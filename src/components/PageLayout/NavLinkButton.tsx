import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton, Group, ThemeIcon, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';

export type NavigationLink = {
  label: string;
  icon: IconDefinition;
  to?: string;
  color?: string;
  onClick?: () => Promise<void>;
};

export const NavLinkButton = (props: NavigationLink) => {
  const { to, icon, label, color, onClick } = props;
  const navigate = useNavigate();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
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
