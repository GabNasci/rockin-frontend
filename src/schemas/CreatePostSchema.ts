import { z } from "zod";

export const createPostSchema = z
  .object({
    text: z
      .string()
      .max(280, "O texto deve ter no máximo 280 caracteres")
      .optional()
      .or(z.literal("")),
    medias: z
      .array(z.instanceof(File))
      .refine(
        (files) => files.every((file) => file.type.startsWith("image/")),
        "Somente arquivos de imagem são permitidos",
      )
      .optional(),
  })
  .refine(
    (data) =>
      (data.text && data.text.trim().length > 0) ||
      (data.medias && data.medias.length > 0),
    {
      message: "",
      path: ["medias"],
    },
  );

export type CreatePostData = z.infer<typeof createPostSchema>;
