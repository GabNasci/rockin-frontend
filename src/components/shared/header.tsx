"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavButton } from "./nav_button";

import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "../icons";

const navItems = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/feed", label: "Feed", icon: FeedIcon },
  { href: "/search", label: "Buscar", icon: SearchIcon },
  { href: "/profile", label: "Perfil", icon: UserIcon },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white flex md:justify-between justify-center px-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center md:flex-1/3 py-4 md:py-0">
        <Image
          src="/imgs/rockin-logo.svg"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>
      <div className="hidden md:flex items-center justify-center gap-8 flex-1/3">
        {navItems.slice(0, 3).map(({ href, label, icon }) => (
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
}
