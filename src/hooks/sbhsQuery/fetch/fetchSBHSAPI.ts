import HTTPError from "../../../errors/HTTPError";
import NetworkError from "../../../errors/NetworkError";

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
  signal?: AbortSignal
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
  } catch {
    throw new NetworkError("Failed to fetch");
  }

  if (!res.ok) {
    const errorText = await res.text();

    if (errorText === "REFRESH_TOKEN") {
      refresh();
    }

    throw new HTTPError(res.status);
  }
  const json = await res.json();
  return json;
};
