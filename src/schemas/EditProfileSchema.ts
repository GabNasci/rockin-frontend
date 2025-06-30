import { HANDLE_REGEX, NAME_REGEX } from "@/lib/constants";
import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .regex(NAME_REGEX, { message: "Nome inválido" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  handle: z
    .string()
    .regex(HANDLE_REGEX, { message: "Nome de usuário inválido" })
    .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" }),
  about: z
    .string()
    .max(255, { message: "Sobre deve ter no máximo 255 caracteres" }),
  genres: z.array(z.string()),
  specialities: z.array(z.string()),
});
export type EditProfileData = z.infer<typeof editProfileSchema>;
