import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { timetableSchema, sbhsKey } from "./schemas";

const queryFn = async () => {
  throw new Error("L morning periods");

  return timetableSchema.parse(
    await authActions.fetchAuthenticated("timetable/timetable.json")
  );
};

const getQueryKey = sbhsKey("timetable/timetable.json");

export const useTimetable = () => {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn,
  });
};

useTimetable.getQueryKey = getQueryKey;
useTimetable.queryFn = queryFn;
