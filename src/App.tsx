import React, { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import ConfirmPasswordPage from './views/Authentication/ConfirmPasswordPage';
import { LoginPage } from './views/Authentication/LoginPage';
import { RegisterPage } from './views/Authentication/RegisterPage';
import { ResetPasswordPage } from './views/Authentication/ResetPasswordPage';
import { VerifyEmailPage } from './views/Authentication/VerifyEmailPage';
import { Root } from './views/Root';

import './App.css';
import { theme } from './theme';
import { UserContextProvider } from './context/useUserContext';
import { AppView } from './views/AppView';
import { Home } from './views/Home';
import { AdminView } from './views/AdminView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // set stale time to 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        children: [
          {
            index: true,
            element: <Navigate to="home" />,
          },
          {
            path: 'home',
            element: <Home />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminView />,
        children: [
          {
            index: true,
            element: <Navigate to="home" />,
          },
          {
            path: 'home',
            element: <Home />,
          },
        ],
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
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
