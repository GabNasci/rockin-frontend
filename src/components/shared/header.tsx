"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavButton } from "./nav_button";
import { navItems } from "@/lib/constants";
import { useMemo, memo } from "react";
import { UserIcon } from "../icons";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";

const Header = memo(function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const pathname = usePathname();

  const showHeader = useMemo(() => {
    return pathname !== "/login" && pathname !== "/signup";
  }, [pathname]);

  const items = useMemo(() => {
    return navItems.map(({ href, label, icon }) => ({
      href,
      label,
      icon,
      isActive: pathname === href,
    }));
  }, [pathname]);

  const isProfilePage = pathname === "/profile";

  const goBack = () => {
    router.back();
  };

  if (!showHeader) return null;

  return (
    <header className="bg-white flex md:justify-between justify-center px-16 fixed top-0 left-0 right-0 z-50 relative">
      {isProfilePage && (
        <div
          onClick={() => goBack()}
          className="flex absolute left-6 top-1/4 cursor-pointer"
        >
          <Image src={"/imgs/back.svg"} alt="Voltar" width={24} height={24} />
        </div>
      )}
      <div className="flex items-center md:flex-1/3 py-4 md:py-0">
        {isProfilePage ? (
          <h1 className="font-bold">@{user?.handle}</h1>
        ) : (
          <Image
            src="/imgs/rockin-logo.svg"
            alt="Logo"
            width={150}
            height={150}
          />
        )}
      </div>
      <div className="hidden md:flex items-center justify-center gap-8 flex-1/3">
        {items.slice(0, 3).map(({ href, label, icon }) => (
          <NavButton
            key={href}
            href={href}
            label={label}
            icon={icon}
            isActive={pathname === href}
          />
        ))}
      </div>
      <div className="hidden md:flex items-center justify-end flex-1/3">
        <div className="w-14">
          <NavButton
            href="/profile"
            label="Perfil"
            icon={UserIcon}
            isActive={pathname === "/profile"}
          />
        </div>
      </div>
    </header>
  );
});

export default Header;
