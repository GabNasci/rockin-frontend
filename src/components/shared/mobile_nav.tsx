"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./nav_button";
import { useMemo } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { navItems, pathIsInNavRoutes } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const profileHandle = pathname.startsWith("/profile/")
    ? pathname.split("/")[2]
    : null;

  const showNav = useMemo(() => {
    if (!pathIsInNavRoutes(pathname)) return false;

    if (pathname === "/login" || pathname === "/signup") return false;

    if (profileHandle && user?.handle && profileHandle !== user.handle) {
      return false;
    }

    return true;
  }, [pathname, user?.handle, profileHandle]);

  const items = useMemo(() => {
    return navItems(user?.handle).map(({ href, label, icon }) => ({
      href,
      label,
      icon,
      isActive: pathname === href,
    }));
  }, [pathname, user?.handle]);

  if (!showNav) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around">
      {items.map(({ href, label, icon }, index) => (
        <NavButton
          key={index}
          href={href}
          label={label}
          icon={icon}
          isActive={pathname === href}
        />
      ))}
    </nav>
  );
}
