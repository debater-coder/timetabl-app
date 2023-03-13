import { createQuery } from "react-query-kit";
import { sbhsAuthActions } from "../../stores/auth";
import { ApiProfile } from "./types";

export const profileQuery = createQuery<ApiProfile>({
  primaryKey: "/sbhs/details/userinfo.json",
  queryFn: () => {
    return sbhsAuthActions.fetchAuthenticated("details/userinfo.json");
  },
});

export const useProfile = (options?: Parameters<typeof profileQuery>[0]) => {
  return profileQuery({
    ...options,
  });
};
