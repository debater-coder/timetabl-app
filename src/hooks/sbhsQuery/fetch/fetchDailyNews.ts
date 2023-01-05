import { fetchSBHSAPI } from "./fetchSBHSAPI";

export type APINotice = {
  title?: string;
  content?: string;
  authorName?: string;
  years?: string[];
};

export type APIDailyNews = {
  notices?: APINotice[];
};

/**
 * Fetches daily news from the SBHS API.
 * @param options Options to send to the API
 * @param refresh A function to refresh the token
 * @returns A promise that resolves to the data from the API
 */
export const fetchDailyNews = async (
  options: Record<string, unknown>,
  refresh: () => void,
  setShouldLogin?: (shouldLogin: boolean) => void
) =>
  await fetchSBHSAPI<APIDailyNews>(
    "dailynews/list.json",
    options,
    refresh,
    setShouldLogin
  );
