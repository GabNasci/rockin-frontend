"use client";
import { useAuthDialog } from "@/lib/contexts/auth-dialog.context";
import { useAuth } from "@/lib/contexts/auth.context";

export function useRequireAuthAction() {
  const { user } = useAuth();
  const { openDialog } = useAuthDialog();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requireAuth = <T extends (...args: any[]) => any>(
    action: T,
  ): ((...args: Parameters<T>) => void) => {
    return (...args: Parameters<T>) => {
      if (!user) {
        openDialog();
        return;
      }

      action(...args);
    };
  };

  return requireAuth;
}
