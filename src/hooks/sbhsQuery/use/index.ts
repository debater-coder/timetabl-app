import { SBHSAPIEndpoint } from "../fetch/fetchSBHSAPI";

/**
 * Generates a query key from endpoint and options.
 * @param endpoint The endpoint to fetch from
 * @param options Options to send to the API
 * @returns A query key for TanStack Query
 */
export const getSBHSAPIQueryKey = <TOptions>(
  endpoint: SBHSAPIEndpoint,
  options: TOptions
): ["sbhs", SBHSAPIEndpoint, TOptions] => ["sbhs", endpoint, options];

export { useStudentID } from "./useStudentID";
export { useDTT } from "./useDTT";
