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
  })
  .mutation('add-poll', {
    input: z.object({
      question: z.string(),
      options: z.array(
        z.object({
          value: z.string(),
        })
      ),
      isPrivate: z.boolean(),
    }),
    async resolve({ input: { question, options, isPrivate } }) {
      return await prisma.poll.create({
        data: {
          question,
          private: isPrivate,
          options: {
            createMany: {
              data: options,
            },
          },
        },
      });
    },
  });
