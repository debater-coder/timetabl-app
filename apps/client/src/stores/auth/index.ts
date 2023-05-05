import { fetchAuthenticated } from "./actions/fetchAuthenticated";
import { login } from "./actions/login";
import { logout } from "./actions/logout";
import { resolve } from "./actions/resolve";

export * from "./sbhsAuth";

/**
 * Actions to modify the authentication state.
 */
export const sbhsAuthActions = {
  /**
   * Log in to the application.
   */
  login,
  logout,
  resolve,
  fetchAuthenticated,
};
