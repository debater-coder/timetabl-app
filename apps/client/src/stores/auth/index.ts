import { fetchAuthenticated } from "./actions/fetchAuthenticated";
import { login } from "./actions/login";
import { logout } from "./actions/logout";
import { resolve } from "./actions/resolve";

export * from "./auth";

/**
 * Actions to modify the authentication state.
 */
export const authActions = {
  /**
   * Log in to the application.
   */
  login,
  logout,
  resolve,
  fetchAuthenticated,
};
