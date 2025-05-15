// hooks/useCreateProfile.ts
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "./api";
import { Profile } from "./types";
import { toast } from "@/lib/toast";

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: Profile) => createProfile(data),
    onSuccess: () => {
      toast.success("Perfil criado com sucesso!");
    },
  });
}
