/**
 * Possible SBHS API endpoints
 */
export type SbhsApiEndpoint =
  | "calendar/days.json"
  | "calendar/terms.json"
  | "timetable/bells.json"
  | "barcodenews/list.json"
  | "dailynews/list.json" // Used in Announcements
  | "diarycalendar/events.json"
  | "details/particiaption.json"
  | "details/userinfo.json" // Used in Barcodes
  | "timetable/daytimetable.json" // Used in Home
  | "timetable/timetable.json";

export const sbhsKey =
  (endpoint: SbhsApiEndpoint) =>
  <T extends Record<string, string>>(options?: T) =>
    [`/sbhs/${endpoint}`, options] as const;
