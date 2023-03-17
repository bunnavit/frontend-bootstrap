import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { getWebsocketUrl } from '../../util/url';
import { getWebsocketAuthParams } from '../TokenService';

export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHandler = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: CloseEvent) => any;
export type SessionSendHandler = (args: Message) => any;

export type ConnectFN = () => void;

export type SessionHook = [
  WebSocket | undefined,
  Dispatch<SetStateAction<WebSocket | undefined>>,
  ConnectFN,
  (args: Message) => void,
  () => void
];

type BaseMessage = {
  action: string;
  operation: string;
};

export type Message = BaseMessage & Record<string, any>;

export const useSession = (
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHandler,
  onClose: SessionDisconnectHandler
): SessionHook => {
  const [session, setSession] = useState<WebSocket>();

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

  const sendMessage = (data: Message) => {
    session?.send(JSON.stringify(data));
  };

  const close = useCallback(() => {
    if (session && session.readyState === session.OPEN) session.close();
  }, [session]);

  return [session, setSession, connect, sendMessage, close];
};
