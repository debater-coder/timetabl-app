import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { dttSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (authActions: OAuth2Actions, date?: string) => {
  return await authActions.fetchAuthenticated(
    "timetable/daytimetable.json",
    date
      ? {
          date,
        }
      : undefined
  );
};

const getQueryKey = sbhsKey("timetable/daytimetable.json");

export const useDtt = (date?: string) => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(
      date
        ? {
            date,
          }
        : undefined
    ),
    queryFn: () => queryFn(authActions, date),
    select: (data) => dttSchema.parse(data),
  });
};

useDtt.getQueryKey = getQueryKey;
useDtt.queryFn = queryFn;
