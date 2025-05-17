// hooks/useCreateProfile.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProfile, findProfileByHandle } from "./api";
import { Profile } from "./types";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export function useCreateProfile() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Profile) => createProfile(data),
    onSuccess: () => {
      toast.success("Perfil criado com sucesso!");
      router.push("/login");
    },
  });
}

export function useGetProfileByHandle(handle: string) {
  return useQuery({
    queryKey: ["profile", handle],
    queryFn: () => findProfileByHandle(handle),
  });
}
