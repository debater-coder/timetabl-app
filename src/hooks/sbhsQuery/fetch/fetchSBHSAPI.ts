import HTTPError from "../../../errors/HTTPError";
import NetworkError from "../../../errors/NetworkError";
import { UnauthorizedError } from "../../../errors/UnauthorisedError";
import { log } from "../../../utils/log";

/**
 * Possible SBHS API endpoints
 */
export type SBHSAPIEndpoint =
  | "calendar/days.json"
  | "calendar/terms.json"
  | "timetable/bells.json"
  | "barcodenews/list.json"
  | "dailynews/list.json" // Used in Announcements
  | "diarycalendar/events.json"
  | "details/particiaption.json"
  | "details/userinfo.json" // Used in Barcodes
  | "timetable/daytimetable.json" // Used in Home
  | "timetable/timetable.json";

/**
 * Fetches data from the SBHS API.
 * @param endpoint The endpoint to fetch from
 * @param options Options to send to the API
 * @param refresh A function to refresh the token
 * @param signal Signal to abort the fetch
 * @returns A promise that resolves to the data from the API
 */
export const fetchSBHSAPI = async <TSBHSAPIData>(
  endpoint: SBHSAPIEndpoint,
  options?: Record<string, unknown>,
  refresh?: () => void,
  signal?: AbortSignal,
  setShouldLogin?: (shouldLogin: boolean) => void,
  depth = 0
): Promise<Awaited<TSBHSAPIData>> => {
  let res;

  try {
    res = await fetch("/api/api", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint, options }),
      signal,
    });
  } catch (error) {
    log(`Network error ${error}`);
    if (error instanceof TypeError) {
      document.dispatchEvent(
        new CustomEvent("onlinechange", { detail: { online: false } })
      );
    }
    throw new NetworkError(error.message);
  }

  document.dispatchEvent(
    new CustomEvent("onlinechange", { detail: { online: true } })
  );

  if (!res.ok) {
    const errorText = await res.text();

    switch (errorText) {
      case "REFRESH_TOKEN":
        await refresh();
        if (depth < 1) {
          return fetchSBHSAPI(
            endpoint,
            options,
            refresh,
            signal,
            setShouldLogin,
            depth + 1
          );
        }
        break;
      case "SERVER_NOT_AVAILABLE":
        document.dispatchEvent(
          new CustomEvent("onlinechange", { detail: { online: false } })
        );
        throw new NetworkError("SBHS API server is not available");
      default:
        if (res.status === 401) {
          setShouldLogin(true);
          throw new UnauthorizedError();
        }
    }
    throw new HTTPError(res.status);
  }
  const json = await res.json();
  return json;
};
