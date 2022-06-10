import { isBrowser } from './isBrowser';
import { isProd } from './isProd';

export const getBaseUrl = () => {
  if (isBrowser) return '';
  if (isProd) return process.env.PROD_URL;
  return process.env.LOCAL_URL;
};
