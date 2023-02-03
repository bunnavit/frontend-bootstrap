import React from 'react';
import { AccountPageLayout } from '../../../components/AccountPageLayout';
import { NewAccountFooter } from './NewAccountFooter';

export const LoginPage = () => {
  return (
    <AccountPageLayout
      title="Log in"
      errorMessage="test"
      footerContent={<NewAccountFooter />}
    >
      test
    </AccountPageLayout>
  );
};
