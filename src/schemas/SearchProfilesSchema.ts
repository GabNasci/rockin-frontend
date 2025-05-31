import { z } from "zod";

export const searchProfileSchemaa = z.object({
  search: z.string().optional(),
  profileType: z.string().optional(), // ainda nao implementado
  genres: z.array(z.string()).optional(),
  specialities: z.array(z.string()).optional(),
  radius: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
