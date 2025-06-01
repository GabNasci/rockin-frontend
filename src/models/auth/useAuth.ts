import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, fetchMe } from "./api";
import { LoginData, ProfileResponse } from "./types";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "@/lib/constants";
import { toast } from "@/lib/toast";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: async (data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.refetchQueries({ queryKey: ["me"] });
      toast.success("Login realizado com sucesso!");
      router.push("/home");
    },
  });
}

export function useMe() {
  return useQuery<ProfileResponse>({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: true,
    meta: {
      silent: true,
    },
  });
}
