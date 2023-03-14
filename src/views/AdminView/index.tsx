import React from 'react';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { Outlet } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout';
import { NavigationLink } from '../../components/PageLayout/NavLinkButton';
import { SessionExpire } from '../../components/SessionExpire';
import { useUserContext } from '../../context/useUserContext';

const NAV_LINKS: NavigationLink[] = [
  { to: '/admin/home', icon: faHome, label: 'Home', color: 'teal' },
];

export const AdminView = () => {
  const { isAuthed } = useUserContext();
  return (
    <PageLayout navigationLinks={NAV_LINKS}>
      {isAuthed ? <Outlet /> : <SessionExpire />}
    </PageLayout>
  );
};
