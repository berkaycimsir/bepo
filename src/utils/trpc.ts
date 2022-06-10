import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import { NextPageContext } from 'next';
import type { AppRouter } from '@/server/routers/_app';

export interface SSRContext extends NextPageContext {
  status?: number;
}

export const trpc = createReactQueryHooks<AppRouter, SSRContext>();

export const {
  useQuery,
  useMutation,
  useContext,
  useDehydratedState,
  useInfiniteQuery,
  useSubscription,
} = trpc;

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;
