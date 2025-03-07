"use client";

import { usePathname } from "next/navigation";
import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "../icons";
import { NavButton } from "./nav_button";

const navItems = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/feed", label: "Feed", icon: FeedIcon },
  { href: "/search", label: "Buscar", icon: SearchIcon },
  { href: "/profile", label: "Perfil", icon: UserIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around">
      {navItems.map(({ href, label, icon }) => (
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
