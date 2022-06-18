import { isProd } from '@/lib/isProd';

export const getPollPrivateUrl = (privateId: string): string => {
  return isProd
    ? `${process.env.NEXT_PUBLIC_PROD_URL}/poll/${privateId}`
    : `${process.env.NEXT_PUBLIC_LOCAL_URL}/poll/${privateId}`;
};
