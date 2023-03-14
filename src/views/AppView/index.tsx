import React from 'react';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { Outlet } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout';
import { NavigationLink } from '../../components/PageLayout/NavLinkButton';
import { useUserContext } from '../../context/useUserContext';
import { SessionExpire } from '../../components/SessionExpire';

const NAV_LINKS: NavigationLink[] = [
  { to: '/app/home', icon: faHome, label: 'Home', color: 'teal' },
];

export const AppView = () => {
  const { isAuthed } = useUserContext();
  return (
    <PageLayout navigationLinks={NAV_LINKS}>
      {isAuthed ? <Outlet /> : <SessionExpire />}
    </PageLayout>
  );
};
