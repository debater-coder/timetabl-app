import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { timetableSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (authActions: OAuth2Actions) => {
  return await authActions.fetchAuthenticated("timetable/timetable.json");
};

const getQueryKey = sbhsKey("timetable/timetable.json");

export const useTimetable = () => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => queryFn(authActions),
    select: (data) => timetableSchema.parse(data),
  });
};

useTimetable.getQueryKey = getQueryKey;
useTimetable.queryFn = queryFn;
