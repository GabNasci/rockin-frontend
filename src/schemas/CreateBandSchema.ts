import { HANDLE_REGEX, NAME_REGEX } from "@/lib/constants";
import { z } from "zod";

export const createBandSchema = z.object({
  name: z
    .string()
    .regex(NAME_REGEX, { message: "Nome inválido" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  handle: z
    .string()
    .regex(HANDLE_REGEX, { message: "Nome de usuário inválido" })
    .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" })
    .max(50, { message: "Nome de usuário deve ter no máximo 50 caracteres" }),
});

export type CreateBandData = z.infer<typeof createBandSchema>;
