import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ConfirmPasswordPage } from './views/Authentication/ConfirmPasswordPage';
import { LoginPage } from './views/Authentication/LoginPage';
import { RegisterPage } from './views/Authentication/RegisterPage';
import { ResetPasswordPage } from './views/Authentication/ResetPasswordPage';
import { VerifyEmailPage } from './views/Authentication/VerifyEmailPage';
import { Root } from './views/Root';

import './App.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/confirm-password',
    element: <ConfirmPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
