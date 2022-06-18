import { prisma } from '@/lib/prisma';
import { createRouter } from '../createRouter';
import { z } from 'zod';

export const pollRouter = createRouter()
  .query('public-polls', {
    async resolve() {
      const polls = await prisma.poll.findMany({
        include: { votes: true, options: { include: { votes: true } } },
        where: { private: { not: { equals: true } } },
      });

      return {
        polls: polls.reverse(),
      };
    },
  })
  .query('private-poll', {
    input: z.object({
      pollId: z.string(),
    }),
    async resolve({ input: { pollId } }) {
      return await prisma.poll.findFirst({
        where: { privateId: pollId },
        include: { votes: true, options: { include: { votes: true } } },
      });
    },
  })
  .query('user-polls', {
    input: z.object({
      userId: z.string(),
      isPrivate: z.boolean(),
    }),
    async resolve({ input: { userId, isPrivate } }) {
      const polls = await prisma.poll.findMany({
        include: { votes: true, options: { include: { votes: true } } },
        where: { userId, private: isPrivate },
      });

      return { polls: polls.reverse() };
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
      userId: z.string(),
      question: z.string(),
      options: z.array(
        z.object({
          value: z.string(),
        })
      ),
      isPrivate: z.boolean(),
    }),
    async resolve({ input: { question, options, isPrivate, userId } }) {
      return await prisma.poll.create({
        data: {
          userId,
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
