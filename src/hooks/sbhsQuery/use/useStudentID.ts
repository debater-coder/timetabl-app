import { fetchUserinfo } from "../fetch";
import { useSBHSQuery } from "./useSBHSQuery";

/**
 * Hook to get student ID.
 * @param enabled Whether to enable the query
 * @returns Query result for student ID
 */
export const useStudentID = (enabled?: boolean) =>
  useSBHSQuery(
    "details/userinfo.json",
    fetchUserinfo,
    {},
    (data) => data.studentId,
    enabled
  );
