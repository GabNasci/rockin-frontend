import { z } from "zod";

export const updateProfileAvatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "Somente arquivos de imagem são permitidos",
    )
    .nullable(),
});
export type UpdateProfileAvatarData = z.infer<typeof updateProfileAvatarSchema>;
