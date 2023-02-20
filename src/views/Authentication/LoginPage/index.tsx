import React, { useEffect, useState } from 'react';
import { faUnlock } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, Button, Group, TextInput, PasswordInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoginRequestData } from '../../../api/Identity';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { useUserContext } from '../../../context/useUserContext';
import { getErrorMessage } from '../../../util/error';
import { NewAccountFooter } from './NewAccountFooter';

type LocationState =
  | {
      from?: {
        pathname: string;
      };
      username?: string;
    }
  | undefined;

const formSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
});

export const LoginPage = () => {
  const { signIn } = useUserContext();
  /** REACT-ROUTER STATE */
  const { state }: { state: LocationState } = useLocation();
  const navigate = useNavigate();

  // VerifyEmailPage will pass this in the location
  const username = state?.username;
  // Get page the user tried to visit earlier if it exists; default to 'home' page.
  const from = state?.from?.pathname ?? '/';

  useEffect(() => {
    // username is defined when redirected from VerifyEmailPage (successful verification)
    if (username) {
      showNotification({
        id: 'verify_success',
        title: 'Verification success',
        message: 'Your email has been verified; you can now log into Coreograph.',
        color: 'green',
      });
    }
  }, [username]);

  /** API STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { onSubmit, getInputProps, errors } = useForm<LoginRequestData>({
    validate: zodResolver(formSchema),
    initialValues: {
      username: username ?? '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginRequestData) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      await signIn(data);

      setIsLoading(false);

      // Send user back to the page they tried to visit before being redirected to the login page
      navigate(from, { replace: true });
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage('Invalid username or password.');
      } else {
        setErrorMessage(getErrorMessage(error));
      }
    }
  };

  return (
    <AccountPageLayout
      title="Log in"
      errorMessage={errorMessage}
      footerContent={<NewAccountFooter />}
    >
      <form onSubmit={onSubmit((values) => handleSubmit(values))}>
        <Stack spacing={25}>
          <TextInput
            size="lg"
            id="email"
            label="Email address"
            placeholder="Email address"
            autoFocus={true}
            {...getInputProps('username')}
            error={errors.username}
          />

          <PasswordInput
            size="lg"
            id="password"
            label="Password"
            placeholder="Password"
            {...getInputProps('password')}
            error={errors.password}
          />

          <Group spacing={6}>
            <Button
              type="submit"
              color="blue.5"
              size="lg"
              leftIcon={<FontAwesomeIcon icon={faUnlock} />}
              loading={isLoading}
            >
              Login
            </Button>

            <Button
              size="md"
              variant="subtle"
              color="blue.5"
              onClick={() => navigate('/reset-password')}
            >
              Forgot my password
            </Button>
          </Group>
        </Stack>
      </form>
    </AccountPageLayout>
  );
};
