import { prisma } from '@/lib/prisma';
import { createRouter } from '../createRouter';

export const pollRouter = createRouter().query('all', {
  async resolve() {
    return {
      polls: await prisma.poll.findMany({
        include: { votes: true, options: { include: { votes: true } } },
      }),
    };
  },
});
