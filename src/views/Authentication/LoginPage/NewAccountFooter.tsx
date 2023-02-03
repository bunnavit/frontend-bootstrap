import React from 'react';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';

export const NewAccountFooter = () => {
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    navigate('/register');
  };

  return (
    <>
      <Text size="xl" weight="bold">
        Need to create an account?
      </Text>
      <Button
        onClick={handleNewAccountClick}
        size="lg"
        leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
        mt={2}
      >
        Start my free account
      </Button>
    </>
  );
};
