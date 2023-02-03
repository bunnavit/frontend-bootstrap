import { parseJwt } from 'util/jwt';
import * as LocalStorage from '../LocalStorage';
import { LocalStorageKey } from '../LocalStorage';

type JWTsObject = {
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
};

export const getJWTAuthBearer = (): string => {
  const accessToken = LocalStorage.get('accessToken');
  const idToken = LocalStorage.get('idToken');
  const refreshToken = LocalStorage.get('refreshToken');
  return `id_token=${idToken},access_token=${accessToken},refresh_token=${refreshToken}`;
};

export const storeJWTs = (JWTs: JWTsObject) => {
  Object.entries(JWTs).forEach(([tokenKey, tokenValue]) => {
    if (tokenValue !== undefined)
      LocalStorage.set(tokenKey as LocalStorageKey, tokenValue);
  });
};

export const removeJWTs = () => {
  LocalStorage.remove('idToken');
  LocalStorage.remove('accessToken');
  LocalStorage.remove('refreshToken');
};

export const getEmailFromIdToken = () => {
  const idToken = LocalStorage.get('idToken');
  if (!idToken) return undefined;

  try {
    const parsedToken = parseJwt(idToken);
    return parsedToken?.email;
  } catch {
    return undefined;
  }
};
