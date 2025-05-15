// hooks/useCreateProfile.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProfile } from "./api";
import { Profile } from "./types";

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: Profile) => createProfile(data),
    onSuccess: () => {
      toast.success("Perfil criado com sucesso!", {
        richColors: true,
      });
    },
  });
}
