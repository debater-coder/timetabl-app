import { useQuery } from "@tanstack/react-query";
import { noticesSchema, sbhsKey } from "./schemas";
import { AuthActions } from "../../stores/auth";
import { useAuthActions } from "../../UserInterface";

const queryFn = async (authActions: AuthActions) => {
  return noticesSchema.parse(
    await authActions.fetchAuthenticated("dailynews/list.json")
  );
};

const getQueryKey = sbhsKey("dailynews/list.json");

export const useDailyNotices = () => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => queryFn(authActions),
  });
};

useDailyNotices.getQueryKey = getQueryKey;
useDailyNotices.queryFn = queryFn;
