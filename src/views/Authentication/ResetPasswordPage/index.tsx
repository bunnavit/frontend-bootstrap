import React, { useState } from 'react';

import { faUnlock } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { z } from 'zod';

import { useNavigate } from 'react-router-dom';
import { Stack, Button, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ResetPasswordRequestData, resetPasswordRequest } from '../../../api/Identity';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { getErrorMessage } from '../../../util/error';
import { NewAccountFooter } from '../LoginPage/NewAccountFooter';

const formSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
});

export const ResetPasswordPage = () => {
  /** REACT-ROUTER STATE */
  const navigate = useNavigate();

  /** API STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { getInputProps, onSubmit, reset, errors } = useForm<ResetPasswordRequestData>({
    validate: zodResolver(formSchema),
    initialValues: {
      username: '',
    },
  });

  const handleSubmit = async (data: ResetPasswordRequestData) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      await resetPasswordRequest(data);
      setIsLoading(false);
      reset();
      // Send user to confirmation page
      navigate('/confirm-password', {
        state: {
          fromResetPassword: true,
          username: data.username,
        },
      });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AccountPageLayout
      title="Reset password"
      errorMessage={errorMessage}
      footerContent={<NewAccountFooter />}
    >
      <form onSubmit={onSubmit((data) => handleSubmit(data))}>
        <Stack spacing={12} color="black">
          <TextInput
            size="lg"
            id="email"
            label="Email address"
            placeholder="Email address"
            autoFocus={true}
            {...getInputProps('username')}
            error={errors.username}
          />

          <Group spacing={24} mt={24}>
            <Button
              type="submit"
              color="blue.5"
              leftIcon={<FontAwesomeIcon icon={faUnlock} />}
              size="lg"
              loading={isLoading}
            >
              Reset password
            </Button>
            <Button variant="subtle" onClick={() => navigate('/login')}>
              Back to login
            </Button>
          </Group>
        </Stack>
      </form>
    </AccountPageLayout>
  );
};
