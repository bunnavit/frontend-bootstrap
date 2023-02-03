export type LocalStorageKey = 'accessToken' | 'idToken' | 'refreshToken';

export const get = (key: LocalStorageKey) => localStorage.getItem(key);

export const set = (key: LocalStorageKey, value: string) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const unsafeSet = (key: LocalStorageKey, value: string) => {
  localStorage.setItem(key, value);
};

export const remove = (key: LocalStorageKey) => localStorage.removeItem(key);
