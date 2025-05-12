// hooks/useCreateProfile.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Profile } from "./types";
import { createProfile } from "./api";

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: Profile) => createProfile(data),
    onSuccess: () => {
      toast.success("Perfil criado com sucesso!");
    },
  });
}
