import { useCallback, useEffect, useState } from "react";
import { Auth } from "../Auth";
import contextualise from "../utils/contextualise";

/**
 * A hook to access authentication related state, and perform authentication operations (e.g. login, logout)
 */
const useAuth = (auth: Auth) => {
  const setState = useState<unknown>(0)[1];
  const rerender = useCallback(() => setState({}), [setState]);

  useEffect(() => {
    auth.handleRedirect(rerender);
  }, [auth, rerender]);

  return {
    loggedIn: auth.loggedIn,
    login: auth.login,
    logout: () => auth.logout(rerender),
    loading: auth.loading,
    shouldRedirect: auth.shouldRedirect,
    refresh: () => auth.refresh(rerender),
    refreshing: auth.refreshing,
    shouldLogin: auth.shouldLogin,
    setShouldLogin: (shouldLogin: boolean) => {
      auth.shouldLogin = shouldLogin;
      rerender();
    },
  };
};

const [useAuthGlobal, AuthProvider] = contextualise(useAuth);

export { AuthProvider, useAuthGlobal as useAuth };
