import { AppProps } from 'next/app';
import { withTRPC } from '@/lib/withTRPC';
import { AppType } from 'next/dist/shared/lib/utils';
import 'styles/root.css';

const MyApp = (({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}) as AppType;

export default withTRPC(MyApp);
