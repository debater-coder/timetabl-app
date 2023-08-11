import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { sbhsKey } from "./schemas";
import { timetableSchema } from "./schemas/timetable";

const queryFn = async () => {
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
