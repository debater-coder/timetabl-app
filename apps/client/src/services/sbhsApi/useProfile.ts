import { createQuery } from "react-query-kit";
import { authActions } from "../../stores/auth";
import { ApiProfile } from "./schemas";

export const profileQuery = createQuery<ApiProfile>({
  primaryKey: "/sbhs/details/userinfo.json",
  queryFn: async () => {
    return await authActions.fetchAuthenticated("details/userinfo.json");
  },
});

export const useProfile = (options?: Parameters<typeof profileQuery>[0]) => {
  return profileQuery({
    ...options,
  });
};
