import { isBrowser } from '@/lib/isBrowser';
import { getUserId } from '@/utils/userId';

type ReturnType = {
  userId: string | null;
};

export const useUserId = (): ReturnType => {
  return {
    userId: !isBrowser ? null : getUserId(),
  };
};
