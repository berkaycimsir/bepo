import { v4 } from 'uuid';

const BEPO_USER_ID_KEY = 'bepo-user-id';

export const getUserId = (): string | null => {
  return localStorage.getItem(BEPO_USER_ID_KEY) as string | null;
};

export const setUserId = (): void => {
  if (!getUserId()) {
    return localStorage.setItem(BEPO_USER_ID_KEY, v4());
  }
};
