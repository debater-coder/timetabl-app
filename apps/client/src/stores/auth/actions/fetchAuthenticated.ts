import { produce } from "immer";
import HTTPError from "../../../errors/HTTPError";
import { SbhsApiEndpoint } from "../../../services/sbhsApi/types";
import NetworkError from "../../../errors/NetworkError";
import {
  logged_in_states,
  useSbhsAuthStore,
  sbhsAuthActions,
  SbhsAuthStatus,
} from "../sbhsAuth";

export const fetchAuthenticated = async <TSbhsApiData>(
  endpoint: SbhsApiEndpoint,
  options?: Record<string, unknown>,
  depth = 0
): Promise<Awaited<TSbhsApiData>> => {
  if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
    // Declare a new response
    let res: Response;
    try {
      // Fetch to the API
      res = await fetch("/api/api", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint,
          options,
        }),
      });
    } catch (error) {
      console.error("Network error", error);
      if (error instanceof TypeError) {
        // If we are offline, dispatch a custom event to notify other parts of the application
        document.dispatchEvent(
          new CustomEvent("onlinechange", { detail: { online: false } })
        );
      }
      throw new NetworkError(error.message);
    }

    // If we made it this far, we are online
    document.dispatchEvent(
      new CustomEvent("onlinechange", { detail: { online: true } })
    );

    if (!res.ok) {
      const errorText = await res.text();

      switch (errorText) {
        case "REFRESH_TOKEN":
          // If the server returns REFRESH_TOKEN, refresh the token
          await sbhsAuthActions.refresh();
          // After refreshing the token, try again but only one more time
          if (depth < 1) {
            return sbhsAuthActions.fetchAuthenticated(
              endpoint,
              options,
              depth + 1
            );
          }
          break;
        case "SERVER_NOT_AVAILABLE":
          // If the server returns SERVER_NOT_AVAILABLE, act as if we are offline
          document.dispatchEvent(
            new CustomEvent("onlinechange", { detail: { online: false } })
          );
          throw new NetworkError("Server not available");
      }
      if (res.status === 401) {
        // If the server returns 401, switch to expired state
        useSbhsAuthStore.setState(
          produce(useSbhsAuthStore.getState(), (draft) => {
            draft.status = SbhsAuthStatus.EXPIRED;
          })
        );
      }
      throw new HTTPError(res.status);
    }
    const json = await res.json();
    // Since we made it this far, we are logged in
    useSbhsAuthStore.setState(
      produce(useSbhsAuthStore.getState(), (draft) => {
        draft.status = SbhsAuthStatus.LOGGED_IN;
      })
    );
    return json;
  } else {
    // Warn if invalid usage occurs
    console.warn(
      `Invalid usage of fetchAuthenticated action with auth status ${
        useSbhsAuthStore.getState().status
      }.`
    );
  }
};
