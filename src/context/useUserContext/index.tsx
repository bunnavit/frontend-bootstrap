import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';

import { useNavigate } from 'react-router-dom';
import { LoginRequestData, logInRequest, postLogout } from '../../api/Identity';
import { getIsAdminFromIdToken, hasJWTs } from '../../services/TokenService';

export type UserContextValues = {
  signIn: (data: LoginRequestData) => Promise<{ isAdmin: boolean }>;
  logOut: () => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  isAuthed: boolean;
  setIsAuthed: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextValues | undefined>(undefined);
UserContext.displayName = 'UserContext';

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(getIsAdminFromIdToken());
  const [isAuthed, setIsAuthed] = useState(hasJWTs());

  const signIn = useCallback(
    async (data: LoginRequestData): Promise<{ isAdmin: boolean }> => {
      await logInRequest(data);
      setIsAuthed(true);
      const isAdminValue = getIsAdminFromIdToken();
      setIsAdmin(isAdminValue);
      return { isAdmin: isAdminValue };
    },
    []
  );

  const logOut = useCallback(async () => {
    // Invalidate all queries
    queryClient.clear();
    setIsAdmin(false);
    setIsAuthed(false);

    postLogout();

    showNotification({
      title: 'Logged out',
      color: 'green',
      message: 'Successfully logged out',
    });
    navigate('/login');
  }, [navigate, queryClient]);

  const value: UserContextValues = useMemo(
    () => ({
      signIn,
      logOut,
      isAdmin,
      setIsAdmin,
      isAuthed,
      setIsAuthed,
    }),
    [isAdmin, setIsAdmin, isAuthed, setIsAuthed, signIn, logOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
