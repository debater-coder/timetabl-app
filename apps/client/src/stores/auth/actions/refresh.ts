import { produce } from "immer";
import config from "../../../config";
import HTTPError from "../../../errors/HTTPError";
import {
  useSbhsAuthStore,
  SbhsAuthStatus,
  logged_in_states,
} from "../sbhsAuth";

export const refresh = async () => {
  // Check if valid state to refresh
  switch (useSbhsAuthStore.getState().status) {
    // If we are already refreshing, wait for the refresh to finish
    case SbhsAuthStatus.REFRESHING: {
      const promise = new Promise<void>((resolve, reject) => {
        const unsub = useSbhsAuthStore.subscribe((state) => {
          unsub();
          if (state.status === SbhsAuthStatus.LOGGED_IN) {
            resolve();
          } else if (state.status === SbhsAuthStatus.EXPIRED) {
            reject();
          }
        });
      });
      return promise;
    }
    default:
      if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
        // Set status to refreshing
        useSbhsAuthStore.setState(
          produce(useSbhsAuthStore.getState(), (draft) => {
            draft.status = SbhsAuthStatus.REFRESHING;
          })
        );
        try {
          const res = await fetch("/api/token", {
            method: "PATCH",
            body: JSON.stringify({
              client_id: config.client_id,
            }),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          });

          if (!res.ok) {
            throw new HTTPError(res.status);
          }

          useSbhsAuthStore.setState(
            produce(useSbhsAuthStore.getState(), (draft) => {
              draft.status = SbhsAuthStatus.LOGGED_IN;
            })
          );
        } catch (error) {
          useSbhsAuthStore.setState(
            produce(useSbhsAuthStore.getState(), (draft) => {
              draft.status = SbhsAuthStatus.EXPIRED;
            })
          );
        }
      } else {
        // Warn if invalid usage occurs
        console.warn(
          `Invalid usage of refresh action with auth status ${
            useSbhsAuthStore.getState().status
          }.`
        );
      }
  }
};
