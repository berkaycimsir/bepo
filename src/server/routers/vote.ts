import { prisma } from '@/lib/prisma';
import { createRouter } from '../createRouter';
import { z } from 'zod';

export const voteRouter = createRouter().mutation('add-vote', {
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
