import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "@/components/icons";

export const navItems = (handle: string | undefined) => [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/feed", label: "Feed", icon: FeedIcon },
  { href: "/search", label: "Buscar", icon: SearchIcon },
  {
    href: handle ? `/profile/${handle}` : "/login",
    label: "Perfil",
    icon: UserIcon,
  },
];

export const HANDLE_REGEX = /^[a-zA-Z0-9._]+$/;

export const TOKEN_KEY = "äuth_token";
