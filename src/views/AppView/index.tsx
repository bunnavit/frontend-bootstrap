import { faHome } from '@fortawesome/pro-solid-svg-icons';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout';
import { NavigationLink } from '../../components/PageLayout/NavLinkButton';

const NAV_LINKS: NavigationLink[] = [
  { to: 'home', icon: faHome, label: 'Home', color: 'teal' },
];

export const AppView = () => {
  return (
    <PageLayout navigationLinks={NAV_LINKS}>
      <Outlet />
    </PageLayout>
  );
};
