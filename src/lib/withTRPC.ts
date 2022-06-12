import { AppRouter } from '@/server/routers/_app';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC as defaultWithTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { getBaseUrl } from './getBaseUrl';
import superjson from 'superjson';

export const withTRPC = (app: AppType) =>
  defaultWithTRPC<AppRouter>({
    config() {
      return {
        links: [
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
        ],
        transformer: superjson,
      };
    },
    ssr: false,
  })(app);
