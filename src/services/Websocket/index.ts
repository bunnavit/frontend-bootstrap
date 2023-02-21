import { useCallback, useEffect, useState } from 'react';
import { getWebsocketUrl } from '../../util/url';
import { getWebsocketAuthParams } from '../TokenService';

export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHandler = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;
export type SessionSendHandler = (args: Data) => any;

// temporary
export type Message = {
  action: 'sendmessage';
  data: Object;
};

export type Data = Object;

export type ConnectFN = () => void;

export type SessionHook = [ConnectFN, (args: Data) => void, () => void];
export type PauseHandlerHook = [(fn: ConnectFN) => void, () => void];

export const useSession = (
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHandler,
  onClose: SessionDisconnectHandler
): SessionHook => {
  const [session, setSession] = useState(null as unknown as WebSocket);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener('open', onOpen);
    return () => {
      session.removeEventListener('open', onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    session.addEventListener('message', onMessage);
    return () => {
      session.removeEventListener('message', onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session) return;
    session.addEventListener('close', onClose);
    return () => {
      session.removeEventListener('close', onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
  useEffect(updateCloseHandler, [session, onClose]);

  const connect = useCallback(() => {
    const url = getWebsocketUrl();
    const params = getWebsocketAuthParams();
    const ws = new WebSocket(url + params);
    setSession(ws);
  }, []);

  const sendMessage = (args: Data) => {
    const message: Message = {
      action: 'sendmessage',
      data: JSON.stringify(args),
    };
    session.send(JSON.stringify(message));
  };

  const close = useCallback(() => {
    if (session.readyState === session.OPEN) session.close();
  }, [session]);

  return [connect, sendMessage, close];
};
