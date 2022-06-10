import { AppRouter } from '@/server/routers/_app';
import { SSRContext } from '@/utils/trpc';
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
    ssr: true,
    responseMeta(opts) {
      const ctx = opts.ctx as SSRContext;

      if (ctx.status) {
        return {
          status: ctx.status,
        };
      }

      const error = opts.clientErrors[0];
      if (error) {
        return {
          status: error.data?.httpStatus ?? 500,
        };
      }
      return {};
    },
  })(app);
