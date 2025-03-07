"use client";

import { usePathname, useRouter } from "next/navigation";
import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "../icons";

const navItems = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/feed", label: "Feed", icon: FeedIcon },
  { href: "/search", label: "Buscar", icon: SearchIcon },
  { href: "/profile", label: "Perfil", icon: UserIcon },
];

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <button
            key={href}
            className={`flex flex-col items-center cursor-pointer hover:bg-background  gap-1 w-full py-4 transition ${
              isActive
                ? "text-primary border-b-4 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => router.push(href)}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
