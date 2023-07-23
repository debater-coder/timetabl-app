import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { daySchema, sbhsKey } from "./schemas";

const queryFn = async (from?: string, to?: string) => {
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
  return useQuery({
    queryKey: getQueryKey(
      from && to
        ? {
            from,
            to,
          }
        : undefined
    ),
    queryFn: () => queryFn(from, to),
    enabled: !!from && !!to,
  });
};

useDay.getQueryKey = getQueryKey;
useDay.queryFn = queryFn;
