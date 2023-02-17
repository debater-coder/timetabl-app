import { createQuery } from "react-query-kit";
import { fetchSbhsApi } from "./fetchSbhsApi";
import { ApiProfile } from "./types";

export const profileQuery = createQuery<ApiProfile>({
  primaryKey: "/sbhs/details/userinfo.json",
  queryFn: () => {
    return fetchSbhsApi("details/userinfo.json");
  },
});

export const useProfile = (options?: Parameters<typeof profileQuery>[0]) => {
  return profileQuery({
    ...options,
  });
};
