import { PrismaClient } from '@prisma/client';
import { isProd } from './isProd';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({ log: !isProd ? ['query', 'error', 'warn'] : ['error'] });

if (!isProd) {
  prismaGlobal.prisma = prisma;
}
