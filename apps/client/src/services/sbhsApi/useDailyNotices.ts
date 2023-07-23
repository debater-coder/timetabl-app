import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { noticesSchema, sbhsKey } from "./schemas";

const queryFn = async () => {
  return noticesSchema.parse(
    await authActions.fetchAuthenticated("dailynews/list.json")
  );
};

const getQueryKey = sbhsKey("dailynews/list.json");

export const useDailyNotices = () => {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn,
  });
};

useDailyNotices.getQueryKey = getQueryKey;
useDailyNotices.queryFn = queryFn;
