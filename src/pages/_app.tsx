import { AppProps } from 'next/app';
import { withTRPC } from '@/lib/withTRPC';
import { AppType } from 'next/dist/shared/lib/utils';
import 'styles/root.css';
import { setUserId } from '@/utils/userId';
import { isBrowser } from '@/lib/isBrowser';

const MyApp = (({ Component, pageProps }: AppProps) => {
  if (isBrowser) setUserId();
  return <Component {...pageProps} />;
}) as AppType;

export default withTRPC(MyApp);
