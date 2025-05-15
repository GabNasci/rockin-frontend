import { HANDLE_REGEX } from "@/lib/constants";
import { z } from "zod";

export const credentialsSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CredentialsData = z.infer<typeof credentialsSchema>;

export const profileInfoSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  handle: z
    .string()
    .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" })
    .regex(HANDLE_REGEX, { message: "Nome de usuário inválido" }),
  profileType: z.string().min(1, "Selecione um tipo de perfil"),
});

export type ProfileInfoData = z.infer<typeof profileInfoSchema>;

export const genresAndSpecialitiesSchema = z.object({
  genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
  specialities: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma especialidade"),
});

export type GenresAndSpecialitiesData = z.infer<
  typeof genresAndSpecialitiesSchema
>;

export const locationSchema = z.object({
  latitude: z.string().min(1, "Selecione uma latitude"),
  longitude: z.string().min(1, "Selecione uma longitude"),
  city: z.string().min(1, "Selecione uma cidade"),
  state: z.string().min(1, "Selecione um estado"),
  country: z.string().min(1, "Selecione um país"),
});

export type LocationData = z.infer<typeof locationSchema>;

export const profileSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    name: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    handle: z
      .string()
      .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" }),
    profileType: z.coerce.number().min(1, "Selecione um tipo de perfil"),
    genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
    specialities: z
      .array(z.string())
      .min(1, "Selecione pelo menos uma especialidade"),
    location: z.object({
      latitude: z.string().min(1, "Selecione uma latitude"),
      longitude: z.string().min(1, "Selecione uma longitude"),
      city: z.string().min(1, "Selecione uma cidade"),
      state: z
        .string()
        .min(1, "Selecione um estado")
        .max(2, "Selecione um estado"),
      country: z.string().min(1, "Selecione um país"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type ProfileData = z.infer<typeof profileSchema>;
