import { useQuery } from "@tanstack/react-query";
import { dttSchema, sbhsKey } from "./schemas";
import { useAuthActions } from "../../UserInterface";
import { AuthActions } from "../../stores/auth";

const queryFn = async (authActions: AuthActions, date?: string) => {
  return dttSchema.parse(
    await authActions.fetchAuthenticated(
      "timetable/daytimetable.json",
      date
        ? {
            date,
          }
        : undefined
    )
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
  });
};

useDtt.getQueryKey = getQueryKey;
useDtt.queryFn = queryFn;
