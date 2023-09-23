import { useQuery } from "@tanstack/react-query";
import { daySchema, sbhsKey } from "./schemas";
import { AuthActions } from "../../stores/auth";
import { useAuthActions } from "../../UserInterface";

const queryFn = async (
  authActions: AuthActions,
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
