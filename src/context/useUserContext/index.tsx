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
import { logInRequest, LoginRequestData } from '../../api/Identity';

export type UserContextValues = {
  signIn: (data: LoginRequestData) => Promise<void>;
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
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAuthed, setIsAuthed] = useState(true);

  const signIn = useCallback(async (data: LoginRequestData) => {
    await logInRequest(data);
    setIsAuthed(true);
  }, []);

  const value: UserContextValues = useMemo(
    () => ({
      signIn,
      isAdmin,
      setIsAdmin,
      isAuthed,
      setIsAuthed,
    }),
    [isAdmin, setIsAdmin, isAuthed, setIsAuthed, signIn]
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
