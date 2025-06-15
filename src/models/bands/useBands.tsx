import { useMutation } from "@tanstack/react-query";
import { createBand } from "./api";
import { CreateBandData } from "@/schemas/CreateBandSchema";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export function useCreateBand(handle?: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateBandData) => createBand(data),
    onSuccess: () => {
      toast.success("Banda criada com sucesso!");
      if (handle) {
        router.push(`/profile/${handle}`);
      } else {
        router.back();
      }
    },
  });
}
