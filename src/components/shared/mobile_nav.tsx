"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./nav_button";
import { useMemo } from "react";
import { navItems } from "@/lib/constants";

export default function MobileNav() {
  const pathname = usePathname();

  const items = useMemo(() => {
    return navItems.map(({ href, label, icon }) => ({
      href,
      label,
      icon,
      isActive: pathname === href,
    }));
  }, [pathname]);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around">
      {items.map(({ href, label, icon }) => (
        <NavButton
          key={href}
          href={href}
          label={label}
          icon={icon}
          isActive={pathname === href}
        />
      ))}
    </nav>
  );
}
