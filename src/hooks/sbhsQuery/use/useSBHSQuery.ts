import { useQuery } from "@tanstack/react-query";
import { getSBHSAPIQueryKey } from ".";
import { useAuth } from "../../useAuth";
import { SBHSAPIEndpoint } from "../fetch/fetchSBHSAPI";

/**
 * Wrapper around fetchX functions to use with TanStack Query.
 */
export const useSBHSQuery = <TOptions, TData, TSelect>(
  endpoint: SBHSAPIEndpoint,
  fetchFn: (
    options: TOptions,
    refresh: () => void,
    signal: AbortSignal
  ) => Promise<TData>,
  options: TOptions,
  select: (data: TData) => TSelect,
  enabled = true
) => {
  const { refresh, loading } = useAuth();

  return useQuery(
    getSBHSAPIQueryKey(endpoint, options),
    ({ signal }) => fetchFn(options, refresh, signal),
    {
      enabled: !loading && enabled,
      select,
    }
  );
};
