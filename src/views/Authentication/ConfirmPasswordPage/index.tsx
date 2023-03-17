import React, { useEffect, useState } from 'react';

import { faCircleExclamation, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Stack, Text, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { z } from 'zod';

import { ConfirmResetRequestData, confirmResetRequest } from '../../../api/Identity';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { getErrorMessage } from '../../../util/error';
import { NewAccountFooter } from '../LoginPage/NewAccountFooter';

const formSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  new_password: z.string().min(1, 'Please enter your password'),
  confirmation_code: z.string().min(1, 'Please enter your verification code'),
});

const ConfirmPasswordPage = () => {
  /** REACT-ROUTER STATE */
  const {
    state,
  }: { state: { fromResetPassword?: boolean; username?: string } | undefined } =
    useLocation();
  const navigate = useNavigate();

  /** API STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { getInputProps, onSubmit, reset, errors } = useForm<ConfirmResetRequestData>({
    validate: zodResolver(formSchema),
    initialValues: {
      username: state?.username ?? '',
      new_password: '',
      confirmation_code: '',
    },
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (state?.fromResetPassword) {
      showNotification({
        id: 'send_success',
        title: 'Verification code sent.',
        message:
          'An email has been sent to your address; please enter the code inside to confirm your new password.',
        color: 'green',
      });
    }
  }, [state]);

  const handleSubmit = async (data: ConfirmResetRequestData) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      await confirmResetRequest(data);
      setIsLoading(false);
      setShowSuccessAlert(true);
      reset();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <AccountPageLayout
      title="Confirm new password"
      errorMessage={errorMessage}
      footerContent={<NewAccountFooter />}
    >
      {showSuccessAlert && (
        <Alert
          icon={<FontAwesomeIcon icon={faCircleExclamation} size="lg" color="green" />}
          color="green"
          mb={12}
        >
          <Text color="black">Your password has been updated. </Text>
          <Button variant="subtle" onClick={() => navigate('/login')}>
            Click here to go to the login page.
          </Button>
        </Alert>
      )}

      <form onSubmit={onSubmit((values) => handleSubmit(values))}>
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

          <PasswordInput
            size="lg"
            id="password"
            label="New password"
            placeholder="Password"
            {...getInputProps('new_password')}
            error={errors.new_password}
          />

          <TextInput
            size="lg"
            id="code"
            label="Verification code"
            description="Enter the verification code that was sent to your email."
            placeholder="Verification code"
            {...getInputProps('confirmation_code')}
            error={errors.confirmation_code}
          />
        </Stack>

        <Button
          type="submit"
          color="blue.5"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faUnlock} />}
          loading={isLoading}
          mt={18}
        >
          Save new password
        </Button>
      </form>
    </AccountPageLayout>
  );
};

export default ConfirmPasswordPage;
