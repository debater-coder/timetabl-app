import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { daySchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (
  authActions: OAuth2Actions,
  from?: string,
  to?: string
) => {
  return daySchema.parse(
    await authActions.fetchAuthenticated(
      "calendar/days.json",
      from && to
        ? {
            from,
            to,
          }
        : undefined
    )
  );
};

const getQueryKey = sbhsKey("calendar/days.json");

export const useDay = (from?: string, to?: string) => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(
      from && to
        ? {
            from,
            to,
          }
        : undefined
    ),
    queryFn: () => queryFn(authActions, from, to),
    enabled: !!from && !!to,
  });
};

useDay.getQueryKey = getQueryKey;
useDay.queryFn = queryFn;
