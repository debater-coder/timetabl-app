import { fetchSBHSAPI } from "./fetchSBHSAPI";

export type APIBell = {
  bell?: string;
  bellDisplay?: string;
  endTime?: string;
  period?: string;
  startTime?: string;
  time?: string;
};

export type APISubject = {
  colour?: string;
  fullTeacher?: string;
  subject?: string;
  title?: string;
};

export type APIPeriod = {
  fullTeacher?: string;
  teacher?: string;
  title?: string;
  year?: string;
  room?: string;
  date?: string;
};

export type APIDTT = {
  bells?: APIBell[];
  timetable?: {
    subjects?: Record<string, APISubject>;
    timetable?: {
      periods?: Record<string, APIPeriod>;
    };
  };
  date?: string;
  classVariations?: Record<
    string,
    {
      period?: string;
      year?: string;
      title?: string;
      teacher?: string;
      type?: string;
      casual?: string;
      casualSurname?: string;
    }
  >;
  roomVariations?: Record<
    string,
    {
      roomTo?: string;
    }
  >;
};

/**
 * Fetches the daily timetable from the SBHS API.
 * @param options Options to send to the API
 * @param refresh A function to refresh the token
 * @returns A promise that resolves to the data from the API
 */
export const fetchDayTimetable = async (
  options: Record<string, unknown>,
  refresh: () => void,
  setShouldLogin?: (shouldLogin: boolean) => void
) =>
  await fetchSBHSAPI<APIDTT>(
    "timetable/daytimetable.json",
    options,
    refresh,
    setShouldLogin
  );
