import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { log } from "../../utils/log";
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
  log("useDtt hook mounted");
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
    select: (data) => {
      try {
        return dttSchema.parse(data);
      } catch (error) {
        console.error(error);
      }
    },
  });
};

useDtt.getQueryKey = getQueryKey;
useDtt.queryFn = queryFn;
