"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./nav_button";
import { useMemo } from "react";
import { navItems } from "@/lib/constants";
import { useAuth } from "@/lib/contexts/auth-context";

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const showNav = useMemo(() => {
    return pathname !== "/login" && pathname !== "/signup";
  }, [pathname]);

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
