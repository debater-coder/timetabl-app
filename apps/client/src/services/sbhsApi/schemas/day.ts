import { z } from "zod";

export const daySchema = z.record(
  z.object({
    date: z.string(),
    term: z.coerce.number().nullish(),
    week: z.coerce.number().nullish(),
    weekType: z.string().length(1).nullish(),
    dayNumber: z.coerce.number().nullish(),
  })
);
