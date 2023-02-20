import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';

export const Root = () => {
  const { isAdmin } = useUserContext();
  const navigate = useNavigate();
  const match = useMatch('/');

  useEffect(() => {
    if (match && isAdmin) {
      navigate('admin');
    }
  }, [isAdmin, match, navigate]);

  return <Outlet />;
};
