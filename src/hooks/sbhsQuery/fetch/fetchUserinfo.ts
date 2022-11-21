import { fetchSBHSAPI } from "./fetchSBHSAPI";

export type APIProfile = {
  studentId?: string;
};

/**
 * Fetches user info from the SBHS API.
 * @param options Options to send to the API
 * @param refresh A function to refresh the token
 * @param signal Signal to abort the fetch
 * @returns A promise that resolves to the data from the API
 */
export const fetchUserinfo = async (
  options?: Record<string, unknown>,
  refresh?: () => void,
  signal?: AbortSignal
) =>
  await fetchSBHSAPI<APIProfile>(
    "details/userinfo.json",
    options,
    refresh,
    signal
  );
