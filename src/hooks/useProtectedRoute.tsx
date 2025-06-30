import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth.context";
import { toast } from "sonner";
import { TOKEN_KEY, ProfileTypeID } from "@/lib/constants";

type UseProtectedRouteProps = {
  profileTypePermited?: ProfileTypeID[];
};

export function useProtectedRoute({
  profileTypePermited,
}: UseProtectedRouteProps = {}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      toast.dismiss();
      router.push("/login");
      return;
    }

    if (!isLoading) {
      if (
        profileTypePermited?.length &&
        user?.profile_type_id &&
        !profileTypePermited.includes(user.profile_type_id)
      ) {
        toast.dismiss();
        router.replace("/home");
        return;
      }
    }

    if (!isLoading) {
      setIsVerifying(false);
    }
  }, [router, profileTypePermited, user?.profile_type_id, isLoading]);

  return { isVerifying };
}
