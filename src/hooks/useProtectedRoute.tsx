"use client";
import { TOKEN_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.push("/login");
      toast.dismiss();
    }
  }, [router]);
}
