import { createRouter } from '../createRouter';
import { pollRouter } from './poll';
import superjson from 'superjson';
import { voteRouter } from './vote';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('poll.', pollRouter)
  .merge('vote.', voteRouter);

export type AppRouter = typeof appRouter;
