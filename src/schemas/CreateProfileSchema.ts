import { z } from "zod";

export const credentialsSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CredentialsSchema = z.infer<typeof credentialsSchema>;

export const profileInfoSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  handle: z
    .string()
    .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" }),
  profileType: z.string().min(1, "Selecione um tipo de perfil"),
});

export type ProfileInfoSchema = z.infer<typeof profileInfoSchema>;

export const genresAndSpecialitiesSchema = z.object({
  genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
  specialities: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma especialidade"),
});

export type GenresAndSpecialitiesSchema = z.infer<
  typeof genresAndSpecialitiesSchema
>;
