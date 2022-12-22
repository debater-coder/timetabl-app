import { createQuery } from "react-query-kit";
import { useAuth } from "../../hooks/useAuth";
import { fetchSbhsApi } from "./fetchSbhsApi";
import { ApiProfile } from "./types";

export const profileQuery = createQuery<ApiProfile>({
  primaryKey: "/sbhs/details/userinfo.json",
  queryFn: () => {
    return fetchSbhsApi("details/userinfo.json");
  },
});

export const useDailyNotices = () => {
  const { loading } = useAuth();

  return profileQuery({
    enabled: !loading,
  });
};
