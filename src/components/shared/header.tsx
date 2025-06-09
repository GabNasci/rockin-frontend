"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavButton } from "./nav_button";
import { useMemo, memo } from "react";
import { UserIcon } from "../icons";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
  mustHaveBackButton,
  navItems,
  notShowMessagessButton,
} from "@/lib/utils";
import { MiddleHeader } from "./middle-header";
import { MessageSquare } from "lucide-react";
import { DropdownMenuAccount } from "./dropdown-menu-account";

const Header = memo(function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const pathname = usePathname();

  const isMessagePage = pathname.includes("/messages");

  const isProfilePage = pathname.includes("/profile");

  const isUserProfilePage = pathname === `/profile/${user?.handle}`;

  const showHeader = useMemo(() => {
    return pathname !== "/login" && pathname !== "/signup";
  }, [pathname]);

  const items = useMemo(() => {
    return navItems(user?.handle)
      .filter((item) => item.showInNav)
      .map(({ href, label, icon }) => ({
        href,
        label,
        icon,
        isActive: pathname === href,
      }));
  }, [pathname, user?.handle]);

  const goBack = () => {
    router.back();
  };

  if (!showHeader) return null;

  return (
    <header
      className={`bg-white flex md:justify-between ${isMessagePage ? "" : "justify-center"}  px-16 fixed top-0 left-0 right-0 z-50`}
    >
      {mustHaveBackButton(pathname) && (
        <div
          onClick={() => goBack()}
          className="flex absolute left-6 top-1/4 cursor-pointer"
        >
          <Image src={"/imgs/back.svg"} alt="Voltar" width={24} height={24} />
        </div>
      )}
      <div className="flex items-center md:flex-1/3 py-4 md:py-0">
        <MiddleHeader pathname={pathname} />
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
        <div className="flex gap-3">
          <NavButton
            href="/profile"
            label="Perfil"
            icon={UserIcon}
            isActive={pathname === "/profile"}
            className="px-2"
          />
          {notShowMessagessButton(pathname) && user && (
            <NavButton
              href="/messages"
              label="Chat"
              icon={MessageSquare}
              className="px-2"
              isActive={pathname === "/messages"}
            />
          )}
        </div>
      </div>
      {isProfilePage && isUserProfilePage && (
        <div className="flex md:hidden absolute right-3 cursor-pointer">
          <DropdownMenuAccount />
        </div>
      )}
      {notShowMessagessButton(pathname) && user && (
        <div className="flex md:hidden absolute right-6 cursor-pointer">
          <NavButton
            href="/messages"
            label="Chat"
            icon={MessageSquare}
            className="px-2"
            isActive={pathname === "/messages"}
          />
        </div>
      )}
    </header>
  );
});

export default Header;
