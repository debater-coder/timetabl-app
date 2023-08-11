import { z } from "zod";

const timetableDaySchema = z.object({
  dayname: z.string(), // name of the day
  routine: z.string(), // routine (see timetable/daytimetable()
  rollcall: z.object({
    // roll call info for this day
    title: z.string(), // name of roll class
    teacher: z.string().nullish(), // teacher code for roll class
    room: z.string().nullish(), // room for roll call
  }),
  periods: z.record(
    z.object({
      // corresponds to routine
      title: z.string(), // short name for class
      teacher: z.string().nullish(), // teacher code for class
      room: z.string().nullish(), // room for class
      year: z.string().nullish(), // year for class (Note [1])
    })
  ),
});

export type TimetableDay = z.infer<typeof timetableDaySchema>;
export const timetableSchema = z
  .object({
    student: z.object({
      surname: z.string(),
      givenname: z.string(),
      sex: z.string().nullish(), // "M"/"B" for male
      DOB: z.string().nullish(), // date of birth. Unix timestamp
      roll: z.coerce.string().nullish(), // index of roll class
      lines: z.record(z.coerce.number()).nullish(),
      extraLines: z.record(z.coerce.number()).nullish(),
      BoSNumber: z.coerce.number(), // Board of Studies number. 0 if not available
      studentId: z.string(), // Student ID number
      year: z.string(), // student's [primary] year group
      years: z.string().array(), // array of years the student is in
    }),
    days: z.record(timetableDaySchema),
    subjects: z.array(
      z.object({
        title: z.string(), // title of the class
        shortTitle: z.string(), // corresponds to period.title
        subject: z.string(), // full name of the subject
        teacher: z.string().nullish(), // teacher code for the class teacher
        fullTeacher: z.string().nullish(), // full name of the teacher
        year: z.coerce.string().nullish(), // year for the class (Note [1])
      })
    ),
    extraSubjects: z
      .record(
        z.object({
          // these subjects have no timetable classes
          title: z.string(), // title of the class
          shortTitle: z.string(), // corresponds to period.title
          teacher: z.string().nullish(), // teacher code for the class teacher
          fullTeacher: z.string().nullish(), // full name of the teacher
        })
      )
      .nullish(),

    rollcall: z.object({
      // roll class details
      title: z.string(), // title of the class
      teacher: z.string(), // teacher code for the teacher
      fullTeacher: z.string(), // full name of the teacher
      room: z.string().nullish(), // roll class room
    }),
    advisor: z.string(), // year adviser
  })
  .transform((data) => {
    return Object.values(data.days);
  });
