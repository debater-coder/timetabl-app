import { createQuery } from "react-query-kit";
import { sbhsAuthActions } from "../../stores/auth";
import { ApiDailyNews, NoticeYear, TimetablNotice, yearMapping } from "./types";

export const dailyNoticesQuery = createQuery<ApiDailyNews>({
  primaryKey: "/sbhs/dailynews/list.json",
  queryFn: () => {
    return sbhsAuthActions.fetchAuthenticated("dailynews/list.json");
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
