import { useAuthActions } from "../../services/UserInterface";
import { AuthActions } from "../../stores/auth";
import { timetableSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

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
