import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import ConfirmPasswordPage from './views/Authentication/ConfirmPasswordPage';
import { LoginPage } from './views/Authentication/LoginPage';
import { RegisterPage } from './views/Authentication/RegisterPage';
import { ResetPasswordPage } from './views/Authentication/ResetPasswordPage';
import { VerifyEmailPage } from './views/Authentication/VerifyEmailPage';
import { Root } from './views/Root';

import './App.css';
import { theme } from './theme';
import { AppView } from './views/AppView';
import { UserContextProvider } from './context/useUserContext';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserContextProvider>
        <Root />
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <Navigate to="app" /> },
      {
        path: 'app',
        element: <AppView />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'confirm-password',
        element: <ConfirmPasswordPage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
    ],
  },
]);

const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ ...theme, colorScheme }}
        withNormalizeCSS={true}
        withGlobalStyles={true}
      >
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
