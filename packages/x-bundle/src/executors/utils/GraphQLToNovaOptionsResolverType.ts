import { IAstToQueryOptions } from "@redlibs/nova";

export type GraphQLToNovaOptionsResolverType<T> = (
  _,
  args,
  ctx,
  ast
) => IAstToQueryOptions<T> | Promise<IAstToQueryOptions<T>>;
