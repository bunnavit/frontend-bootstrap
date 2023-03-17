import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import { useColorModeValue } from '../../../hooks/useColorModeValue';

export const NewAccountFooter = () => {
  const textColor = useColorModeValue('white', 'dark');
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    navigate('/register');
  };

  return (
    <>
      <Text color={textColor} size="xl" weight="bold">
        Need to create an account?
      </Text>
      <Button
        variant="white"
        color="dark"
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
