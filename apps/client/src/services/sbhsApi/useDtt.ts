import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { dttSchema, sbhsKey } from "./schemas";

const queryFn = async (date?: string) => {
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
  return useQuery({
    queryKey: getQueryKey(
      date
        ? {
            date,
          }
        : undefined
    ),
    queryFn: () => queryFn(date),
  });
};

useDtt.getQueryKey = getQueryKey;
useDtt.queryFn = queryFn;
