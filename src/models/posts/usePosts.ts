import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Post } from "./types";
import { createPost } from "./api";
import { toast } from "@/lib/toast";

export function useCreatePost() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Post) => createPost(data),
    onSuccess: () => {
      toast.success("Post criado com sucesso!");
      router.push("/home");
    },
  });
}
