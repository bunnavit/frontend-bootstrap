import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { faUnlock } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { z } from 'zod';
import { Stack, Text, Button, Group, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import {
  VerifyRequestData,
  verifyRequest,
  resendCodeRequest,
} from '../../../api/Identity';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { getErrorMessage } from '../../../util/error';
import { NewAccountFooter } from '../LoginPage/NewAccountFooter';

const formSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  confirmation_code: z.string().min(1, 'Please enter your verification code'),
});

export const VerifyEmailPage = () => {
  /** REACT-ROUTER STATE */
  const { state }: { state: { fromRegister?: boolean; username?: string } | undefined } =
    useLocation();
  const navigate = useNavigate();

  /** API STATE */
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    values: { username },
    getInputProps,
    onSubmit,
    reset,
    errors,
  } = useForm<VerifyRequestData>({
    validate: zodResolver(formSchema),
    initialValues: {
      confirmation_code: '',
      username: state?.username ?? '',
    },
  });

  const isResendDisabled = !username;

  useEffect(() => {
    if (state?.fromRegister) {
      showNotification({
        id: 'register_success',
        title: 'Successfully registered.',
        message:
          'An email has been sent to your address; please enter the code inside to verify your account.',
        color: 'green',
      });
    }
  }, [state]);

  const handleSubmit = async (data: VerifyRequestData) => {
    setErrorMessage('');
    try {
      setIsVerifyLoading(true);
      await verifyRequest(data);
      reset();
      navigate('/login', { state: { username: data.username } });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setIsResendLoading(true);
      await resendCodeRequest({ username });
      showNotification({
        id: 'resend_success',
        title: 'Code re-sent.',
        message: 'Another verification code has been sent to your email address.',
        color: 'green',
      });
    } catch (error) {
      showNotification({
        id: 'resend_error',
        title: 'Error resending code.',
        message: getErrorMessage(error),
        color: 'red',
      });
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <AccountPageLayout
      title="Verify new account"
      errorMessage={errorMessage}
      footerContent={<NewAccountFooter />}
    >
      <form onSubmit={onSubmit((data) => handleSubmit(data))}>
        <Stack spacing={24} color="black">
          <TextInput
            size="lg"
            id="email"
            label="Email address"
            placeholder="Email address"
            autoFocus={true}
            {...getInputProps('username')}
            error={errors.username}
          />

          <TextInput
            size="lg"
            id="code"
            label="Verification code"
            description={
              <Group spacing={20}>
                <Text>Enter the verification code that was sent to your email</Text>
                <Button
                  size="sm"
                  color="gray"
                  disabled={isResendDisabled}
                  onClick={resendCode}
                  loading={isResendLoading}
                >
                  Resend code
                </Button>
              </Group>
            }
            placeholder="Verification code"
            {...getInputProps('confirmation_code')}
            error={errors.confirmation_code}
          />
        </Stack>

        <Button
          mt={24}
          type="submit"
          color="blue.5"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faUnlock} />}
          loading={isVerifyLoading}
        >
          Verify
        </Button>
      </form>
    </AccountPageLayout>
  );
};
