import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Anchor, Group } from '@mantine/core';

import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../services/Websocket';
import { useUserContext } from '../useUserContext';
import { CustomLoader } from '../../components/CustomLoader';
import { transformStringToObject } from './util';

export type WebsocketContextValues = {
  session: WebSocket | undefined;
};

const WebsocketContext = createContext<WebsocketContextValues | undefined>(undefined);
WebsocketContext.displayName = 'WebsocketContext';

type WebsocketContextProviderProps = {
  children: ReactNode;
};

export const WebsocketContextProvider = ({ children }: WebsocketContextProviderProps) => {
  const { setIsAuthed } = useUserContext();
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(false);

  const onOpen = (e: Event) => {
    setIsConnected(true);
  };

  const onClose = (e: CloseEvent) => {
    setSession(undefined);
    setIsConnected(false);
    if (e.type === 'close' && !e.wasClean) {
      setIsAuthed(false);
      showNotification({
        id: 'session_expired',
        title: 'Session expired.',
        message: (
          <Group spacing={5}>
            Your session has expired,
            <Anchor component="button" type="button" onClick={() => navigate('/login')}>
              Click here to login
            </Anchor>
          </Group>
        ),
        color: 'yellow',
      });
    }
  };

  const onMessage = (e: MessageEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = transformStringToObject.parse(e.data);

    // do zod parsing here with data...
  };

  const [session, setSession, connect] = useSession(onOpen, onMessage, onClose);

  useEffect(() => {
    if (!session || session.readyState === session.CLOSED) {
      connect();
    }

    return () => session?.close();
  }, [session, connect]);

  const value: WebsocketContextValues = useMemo(
    () => ({
      session,
    }),
    [session]
  );

  return (
    <WebsocketContext.Provider value={value}>
      {isConnected ? children : <CustomLoader message="Connecting to websocket..." />}
    </WebsocketContext.Provider>
  );
};

export const useWebsocketContext = () => {
  const context = useContext(WebsocketContext);

  if (context === undefined) {
    throw new Error('useWebsocketContext must be used within a WebsocketContextProvider');
  }

  return context;
};
