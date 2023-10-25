import { dttSchema } from "./schemas";
import { describe, expect, test } from "vitest";

describe("the schema", () => {
  test("parses a day timetable with no periods", () => {
    const dtt = {
      status: "OK",
      date: "2023-09-20",
      bells: [
        {
          period: "0",
          startTime: "08:00",
          endTime: "08:57",
          type: "O",
          time: "08:00",
          bell: "0",
          bellDisplay: "Period 0",
        },
        {
          period: "RC",
          startTime: "08:57",
          endTime: "09:00",
          type: "O",
          time: "08:57",
          bell: "RC",
          bellDisplay: "Roll Call",
        },
        {
          period: "1",
          startTime: "09:00",
          endTime: "10:00",
          type: "T",
          time: "09:00",
          bell: "1",
          bellDisplay: "Period 1",
        },
        {
          period: "2",
          startTime: "10:05",
          endTime: "11:05",
          type: "T",
          time: "10:05",
          bell: "2",
          bellDisplay: "Period 2",
        },
        {
          period: "R",
          startTime: "11:05",
          endTime: "11:22",
          type: "R",
          time: "11:05",
          bell: "R",
          bellDisplay: "Recess",
        },
        {
          period: "3",
          startTime: "11:25",
          endTime: "12:25",
          type: "T",
          time: "11:25",
          bell: "3",
          bellDisplay: "Period 3",
        },
        {
          period: "WFL1",
          startTime: "12:25",
          endTime: "12:45",
          type: "R",
          time: "12:25",
          bell: "WFL1",
          bellDisplay: "Lunch 1",
        },
        {
          period: "WFL2",
          startTime: "12:45",
          endTime: "13:02",
          type: "R",
          time: "12:45",
          bell: "WFL2",
          bellDisplay: "Lunch 2",
        },
        {
          period: "4",
          startTime: "13:05",
          endTime: "14:05",
          type: "T",
          time: "13:05",
          bell: "4",
          bellDisplay: "Period 4",
        },
        {
          period: "5",
          startTime: "14:10",
          endTime: "15:10",
          type: "T",
          time: "14:10",
          bell: "5",
          bellDisplay: "Period 5",
        },
        {
          period: "EoD",
          startTime: "15:10",
          endTime: null,
          type: "O",
          time: "15:10",
          bell: "EoD",
          bellDisplay: "End of Day",
        },
      ],
      timetable: {
        timetable: {
          periods: [],
        },
        subjects: [],
      },
      roomVariations: [],
      classVariations: [],
      serverTimezone: "36000",
      shouldDisplayVariations: true,
    };

    expect(dttSchema.parse(dtt)).toMatchSnapshot();
  });
});
