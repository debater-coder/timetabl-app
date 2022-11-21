import { fetchDailyNews } from "../fetch";
import { useSBHSQuery } from "./useSBHSQuery";

export enum NoticeYear {
  ALL,
  YEAR7,
  YEAR8,
  YEAR9,
  YEAR10,
  YEAR11,
  YEAR12,
  STAFF,
  UNKNOWN,
}

const yearMapping: Record<string, NoticeYear> = {
  "7": NoticeYear.YEAR7,
  "8": NoticeYear.YEAR8,
  "9": NoticeYear.YEAR9,
  "10": NoticeYear.YEAR10,
  "11": NoticeYear.YEAR11,
  "12": NoticeYear.YEAR12,
  staff: NoticeYear.STAFF,
  Staff: NoticeYear.STAFF,
};

export type TimetablNotice = {
  title?: string;
  content?: string;
  authorName?: string;
  years?: NoticeYear[];
  date?: string;
};

export const useDailyNotices = (enabled?: boolean) =>
  useSBHSQuery(
    "dailynews/list.json",
    fetchDailyNews,
    {},
    (data) =>
      data?.notices.map((notice) => ({
        ...notice,
        years: notice?.years.map(
          (year) => yearMapping?.[year] ?? NoticeYear.UNKNOWN
        ),
      })),
    enabled
  );
