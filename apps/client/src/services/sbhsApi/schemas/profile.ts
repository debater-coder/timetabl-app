import { z } from "zod";

export const profileSchema = z.object({
  username: z.coerce.string(),
  studentId: z.coerce.string(),
  givenName: z.coerce.string(),
  surname: z.coerce.string(),
  rollClass: z.coerce.string(),
  yearGroup: z.coerce.string(),
  role: z.coerce.string(), // may be valid for staff
  department: z.coerce.string(), // may be valid for staff
  office: z.coerce.string(), // may be valid for staff
  email: z.coerce.string().email(),
  decEmail: z.coerce.string().email(),
});
