import React from 'react';

import { createStyles, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  icon: {
    color: theme.colors.cyan,
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export const SessionExpire = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <div>
          <Title className={classes.title}>Session expired...</Title>
          <Text color="dimmed" size="lg">
            Your current session has expired, please log in again to access the
            application.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate('/login')}
          >
            Get back to login page
          </Button>
        </div>
        <FontAwesomeIcon size="8x" className={classes.icon} icon={faLock} />
      </SimpleGrid>
    </Container>
  );
};
