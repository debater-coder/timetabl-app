import { queryClient } from "../../../createQueryClient";
import { useSbhsAuthStore, SbhsAuthStatus } from "../sbhsAuth";

export const logout = () => {
  // Clear localstorage
  localStorage.clear();

  // Reset query cache
  queryClient.clear();

  // Set status to logged out
  useSbhsAuthStore.setState({ status: SbhsAuthStatus.LOGGED_OUT });
};
