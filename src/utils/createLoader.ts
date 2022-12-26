import { QueryClient } from "@tanstack/react-query";
import { QueryHook } from "react-query-kit";

export const createLoader =
  <TVariables>(
    queryHook: QueryHook<unknown, TVariables>,
    variables: Parameters<typeof queryHook.getKey>[0]
  ) =>
  (queryClient: QueryClient) =>
  async () => {
    const query = {
      queryKey: queryHook.getKey(variables),
      queryFn: queryHook.queryFn,
    };

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery<unknown, unknown, unknown, unknown[]>(
        query
      ))
    );
  };
