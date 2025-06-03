import { z } from "zod";

export const searchProfileSchema = z.object({
  search: z.string().optional(),
  profileTypes: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
  specialities: z.array(z.string()).optional(),
  includeBands: z.boolean().optional(),
  radius: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type SearchProfilesData = z.infer<typeof searchProfileSchema>;
