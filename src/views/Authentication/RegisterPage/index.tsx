import React, { useState } from 'react';
import { z } from 'zod';
import {
  faArrowRight,
  faCircleExclamation,
  faSignIn,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Alert,
  Stack,
  Tooltip,
  Text,
  PasswordInput,
  TextInput,
  List,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { RegisterRequestData, signUpRequest } from '../../../api/Identity';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { getErrorMessage } from '../../../util/error';
import {
  ONE_LOWERCASE,
  ONE_NUMBER,
  ONE_SPECIAL,
  ONE_UPPERCASE,
} from '../../../util/regex';

const formSchema = z
  .object({
    username: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .refine(
        (val) => ONE_LOWERCASE.test(val),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (val) => ONE_UPPERCASE.test(val),
        'Password must contain at least one uppercase letter'
      )
      .refine((val) => ONE_NUMBER.test(val), 'Password must contain at least one number')
      .refine(
        (val) => ONE_SPECIAL.test(val),
        'Password must contain at least one special character'
      )
      .refine(
        (val) => z.string().min(8).safeParse(val).success,
        'Password must be 8 characters or longer'
      ),
    password2: z.string().min(1, 'Please confirm your password'),
  })
  .refine(({ password, password2 }) => password === password2, {
    message: 'Passwords must match',
    path: ['password2'],
  });

export const RegisterPage = () => {
  /** REACT-ROUTER STATE */
  const navigate = useNavigate();

  /** API STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /** FORM STATE */
  const { getInputProps, onSubmit, reset, errors } = useForm<RegisterRequestData>({
    validate: zodResolver(formSchema),
    initialValues: {
      username: '',
      password: '',
      password2: '',
    },
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (data: RegisterRequestData) => {
    setErrorMessage('');
    setShowSuccessAlert(false);
    setIsLoading(true);

    try {
      await signUpRequest(data);

      setIsLoading(false);
      setShowSuccessAlert(true);

      reset();

      navigate('/verify-email', {
        state: { fromRegister: true, username: data.username },
      });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(getErrorMessage(error));
    }
  };

  /** CHAKRA UI COLOR STATE */
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <AccountPageLayout
      title="Create your account"
      errorMessage={errorMessage}
      footerContent={
        <Button
          variant="white"
          color="dark"
          onClick={handleLoginClick}
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
        >
          Go to login
        </Button>
      }
    >
      {showSuccessAlert && (
        <Alert
          icon={<FontAwesomeIcon icon={faCircleExclamation} size="lg" color="green" />}
          color="green"
          mb={32}
        >
          <Text color="black">
            An email has been sent to your address; please follow the steps inside to
            verify your account.
          </Text>
          <Button variant="subtle" onClick={() => navigate('/login')}>
            Click here to go to the login page.
          </Button>
        </Alert>
      )}

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

          <PasswordInput
            size="lg"
            id="password"
            label="Password"
            placeholder="Password"
            {...getInputProps('password')}
            error={errors.password}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            // eslint-disable-next-line react/no-unstable-nested-components
            inputContainer={(children) => (
              <Tooltip
                color="gray.1"
                sx={{ border: '1px solid black' }}
                label={
                  <List>
                    <List.Item>8 or more characters</List.Item>
                    <List.Item>At least one lowercase letter</List.Item>
                    <List.Item>At least one uppercase letter</List.Item>
                    <List.Item>At least one number</List.Item>
                    <List.Item>At least one special character</List.Item>
                  </List>
                }
                opened={passwordFocus}
              >
                {children}
              </Tooltip>
            )}
          />

          <PasswordInput
            size="lg"
            id="password2"
            label="Confirm password"
            placeholder="Confirm password"
            {...getInputProps('password2')}
            error={errors.password2}
          />
        </Stack>

        <Button
          type="submit"
          color="blue.5"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faSignIn} />}
          loading={isLoading}
          mt={24}
        >
          Register
        </Button>
      </form>
    </AccountPageLayout>
  );
};
