import { z } from "zod";
import { NoticeYear, TimetablNotice } from "../sbhsApi/schemas";

export const timetablNewsSchema = z
  .object({
    data: z.array(
      z.object({
        attributes: z.object({
          title: z.string(),
          content: z.string(),
          createdAt: z.string(),
          createdBy: z.object({
            data: z.object({
              attributes: z.object({
                firstname: z.string(),
                lastname: z.string(),
              }),
            }),
          }),
        }),
      })
    ),
  })
  .transform((data) => {
    const transformed = data.data.map((announcement) => ({
      years: [
        NoticeYear.YEAR7,
        NoticeYear.YEAR8,
        NoticeYear.YEAR9,
        NoticeYear.YEAR10,
        NoticeYear.YEAR11,
        NoticeYear.YEAR12,
        NoticeYear.STAFF,
      ],
      title: announcement.attributes.title,
      content: announcement.attributes.content,
      authorName:
        announcement.attributes.createdBy.data.attributes.firstname +
        " " +
        announcement.attributes.createdBy.data.attributes.lastname,
      date: announcement.attributes.createdAt,
    }));

    return transformed;
  });

// type TimetablNotice = {
//   years: NoticeYear[];
//   title: string;
//   content: string;
//   dates: string[];
//   relativeWeight: number;
//   isMeeting: boolean;
//   meetingDate?: string | undefined;
//   meetingTimeParsed?: string | undefined;
//   meetingTime?: string | undefined;
//   displayYears?: string | undefined;
//   authorName?: string | undefined;
// }
