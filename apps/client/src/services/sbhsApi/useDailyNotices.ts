import { createQuery } from "react-query-kit";
import { authActions } from "../../stores/auth";
import {
  ApiDailyNews,
  NoticeYear,
  TimetablNotice,
  yearMapping,
} from "./schemas";

export const dailyNoticesQuery = createQuery<ApiDailyNews>({
  primaryKey: "/sbhs/dailynews/list.json",
  queryFn: async () => {
    return await authActions.fetchAuthenticated("dailynews/list.json");
  },
});

export const useDailyNotices = (
  options: Parameters<typeof dailyNoticesQuery>[0]
) => {
  return dailyNoticesQuery<TimetablNotice[]>({
    ...options,
    select: (data): TimetablNotice[] =>
      data?.notices.map((notice) => ({
        ...notice,
        years: notice?.years.map(
          (year) => yearMapping?.[year] ?? NoticeYear.UNKNOWN
        ),
      })),
  });
};
