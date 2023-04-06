import { produce } from "immer";
import { QueryClient } from "@tanstack/react-query";
import {
  logged_in_states,
  useSbhsAuthStore,
  SbhsAuthStatus,
} from "../sbhsAuth";

export const logout = async (queryClient: QueryClient) => {
  // Check if valid state to logout
  if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
    // Send logout request to server
    await fetch("/api/token", {
      method: "DELETE",
    });

    // Reset query cache
    queryClient.clear();

    // Set status to logged out
    useSbhsAuthStore.setState(
      produce(useSbhsAuthStore.getState(), (draft) => {
        draft.status = SbhsAuthStatus.LOGGED_OUT;
      })
    );
  } else {
    // Warn if invalid usage occurs
    console.warn(
      `Invalid usage of logout action with auth status ${
        useSbhsAuthStore.getState().status
      }.`
    );
  }
};
