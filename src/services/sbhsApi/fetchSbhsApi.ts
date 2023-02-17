import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { UnauthorizedError } from "../../errors/UnauthorisedError";
import { log } from "../../utils/log";
import { SbhsApiEndpoint } from "./types";

/**
 * Fetches data from the SBHS API.
 * @param endpoint The endpoint to fetch from
 * @param options Options to send to the API
 * @returns A promise that resolves to the data from the API
 */
export const fetchSbhsApi = async <TSBHSAPIData>(
  endpoint: SbhsApiEndpoint,
  options?: Record<string, unknown>,
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
        await auth.refresh();
        if (depth < 1) {
          return fetchSbhsApi(endpoint, options, depth + 1);
        }
        break;
      case "SERVER_NOT_AVAILABLE":
        document.dispatchEvent(
          new CustomEvent("onlinechange", { detail: { online: false } })
        );
        throw new NetworkError("SBHS API server is not available");
    }
    if (res.status === 401) {
      auth.shouldLogin = true;
      throw new UnauthorizedError();
    }
    throw new HTTPError(res.status);
  }
  const json = await res.json();
  auth.shouldLogin = false;
  return json;
};
