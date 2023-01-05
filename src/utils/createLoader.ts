import { QueryClient } from "@tanstack/react-query";
import { QueryHook } from "react-query-kit";

export const createLoader =
  <TVariables>(
    ...queries: {
      queryHook: QueryHook<unknown, TVariables>;
      variables?: Parameters<QueryHook<unknown, TVariables>["getKey"]>[0];
    }[]
  ) =>
  (queryClient: QueryClient) =>
  async () => {
    const results = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const { queryHook, variables } of queries) {
      const query = {
        queryKey: queryHook.getKey(variables),
        queryFn: queryHook.queryFn,
      };

      results.push(
        queryClient.getQueryData(query.queryKey) ??
          queryClient.fetchQuery<unknown, unknown, unknown, unknown[]>(query)
      );
    }

    return results;
  };
