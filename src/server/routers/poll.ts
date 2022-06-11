import { prisma } from '@/lib/prisma';
import { createRouter } from '../createRouter';
import { z } from 'zod';

export const pollRouter = createRouter()
  .query('all', {
    async resolve() {
      return {
        polls: await prisma.poll.findMany({
          include: { votes: true, options: { include: { votes: true } } },
        }),
      };
    },
  })
  .mutation('add-vote', {
    input: z.object({
      pollId: z.number(),
      optionId: z.number(),
      userId: z.string(),
    }),
    async resolve({ input: { pollId, optionId, userId } }) {
      return await prisma.vote.create({
        data: {
          pollId,
          optionId,
          uniqueUserId: userId,
        },
      });
    },
  });
