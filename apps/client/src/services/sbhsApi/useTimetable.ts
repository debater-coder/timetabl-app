import { useQuery } from "@tanstack/react-query";
import { timetableSchema, sbhsKey } from "./schemas";
import { AuthActions } from "../../stores/auth";
import { useAuthActions } from "../../UserInterface";

const queryFn = async (authActions: AuthActions) => {
  return timetableSchema.parse(
    await authActions.fetchAuthenticated("timetable/timetable.json")
  );
};

const getQueryKey = sbhsKey("timetable/timetable.json");

export const useTimetable = () => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => queryFn(authActions),
  });
};

useTimetable.getQueryKey = getQueryKey;
useTimetable.queryFn = queryFn;
