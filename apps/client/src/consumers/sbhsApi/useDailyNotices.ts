import { useAuthActions } from "../../services/UserInterface";
import { AuthActions } from "../../stores/auth";
import { noticesSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

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
