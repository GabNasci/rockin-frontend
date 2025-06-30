"use client";

import { getImageUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import { useAuth } from "@/lib/contexts/auth.context";
import UserAvatar from "./user_avatar";

interface NavButtonProps {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  className?: string;
}

export function NavButton({
  href,
  label,
  icon: Icon,
  isActive,
  className,
}: NavButtonProps) {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const profileRedirect = (hrefProp: string) => {
    if (hrefProp.includes("/profile")) {
      if (user) {
        router.push(`/profile/${user.handle}`);
      } else {
        router.push("/login");
      }
    } else {
      router.push(hrefProp);
    }
  };

  const showImage =
    user !== undefined && isLoggedIn && user?.avatar && label == "Perfil";

  return (
    <button
      className={`flex flex-col items-center cursor-pointer hover:bg-background gap-1 w-full py-4 md:py-2 transition ${
        isActive
          ? "text-primary border-b-4 border-primary"
          : "text-muted-foreground"
      } ${className}`}
      onClick={() => profileRedirect(href)}
    >
      {showImage ? (
        <UserAvatar avatar={getImageUrl(user.avatar)} alreadyHaveUrl />
      ) : (
        <Icon className={`w-6 h-6`} />
      )}
      <span className="text-xs">{label}</span>
    </button>
  );
}
