import { queryClient } from "../../../createQueryClient";
import { useAuthStore, AuthStatus } from "../auth";

export const logout = () => {
  // Clear localstorage
  localStorage.clear();

  // Reset query cache
  queryClient.clear();

  // Set status to logged out and clear token
  useAuthStore.setState({ status: AuthStatus.LOGGED_OUT, token: null });
};
