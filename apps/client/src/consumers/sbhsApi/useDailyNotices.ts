import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { noticesSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (authActions: OAuth2Actions) => {
  return await authActions.fetchAuthenticated("dailynews/list.json");
};

const getQueryKey = sbhsKey("dailynews/list.json");

export const useDailyNotices = () => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => queryFn(authActions),
    select: (data) => noticesSchema.parse(data),
  });
};

useDailyNotices.getQueryKey = getQueryKey;
useDailyNotices.queryFn = queryFn;
