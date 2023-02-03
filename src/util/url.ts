import { getJWTAuthBearer } from '../services/TokenService';

type RequestType = 'unprotected' | 'protected';

export const isLocalhost = () => {
  return (
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  );
};

export const getRequestHeaders = (type: RequestType) => {
  if (type === 'unprotected') {
    return {
      'Content-Type': 'text/plain; charset=UTF-8',
      // Add null Authorization header to send pre-flight request on localhost
      // https://coreograph.slack.com/archives/C02CUKV428P/p1660659618295049?thread_ts=1660647037.012479&cid=C02CUKV428P
      ...(isLocalhost() && { Authorization: null }),
    };
  }
  if (type === 'protected') {
    return {
      'Content-Type': 'text/plain; charset=UTF-8',
      Authorization: getJWTAuthBearer(),
    };
  }
};

export const getIdentityUrl = () => {
  return import.meta.env.VITE_IDENTITY_URL;
};
