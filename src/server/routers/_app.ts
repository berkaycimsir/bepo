import { createRouter } from '../createRouter';
import { pollRouter } from './poll';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('poll.', pollRouter);

export type AppRouter = typeof appRouter;
