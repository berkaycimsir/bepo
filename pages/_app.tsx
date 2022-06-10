import type { AppProps } from 'next/app';
import '../styles/root.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
