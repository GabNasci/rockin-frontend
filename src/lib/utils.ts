import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Option } from "@/components/shared/multi-select";
import { navRoutes, pageTitles, routesWithBackButton } from "./constants";
import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MessageSquare } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToNumbers(strings: string[]): number[] {
  return strings.map((str) => Number(str));
}

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}

export function mapToOptions<T>(
  items: T[] | undefined | null,
  getLabel: (item: T) => string,
  getValue: (item: T) => string | number,
): Option[] {
  if (!items) return [];
  return items.map((item) => ({
    label: getLabel(item),
    value: String(getValue(item)),
  }));
}

export function getImageUrl(imageName: string | null | undefined) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${baseUrl}/uploads/${imageName}`;
}

export function getHandleByPathhname(pathname: string) {
  const handle = pathname.split("/").pop() || "";
  return handle;
}

export const navItems = (handle?: string | undefined) => [
  { href: "/home", label: "Home", icon: HomeIcon, showInNav: true },
  { href: "/feed", label: "Feed", icon: FeedIcon, showInNav: true },
  { href: "/search", label: "Buscar", icon: SearchIcon, showInNav: true },
  {
    href: handle ? `/profile/${handle}` : "/login",
    label: "Perfil",
    icon: UserIcon,
    showInNav: true,
  },
  {
    href: "/messages",
    label: "Conversas",
    icon: MessageSquare,
    showInNav: false,
  },
];

export const pathIsInNavRoutes = (pathname: string) => {
  return navRoutes.find((item) => pathname.includes(item));
};

export const mustHaveBackButton = (pathname: string) => {
  return routesWithBackButton.some((route) => pathname.includes(route));
};

export const getTitlePage = (pathname: string) => {
  return pageTitles.find((title) => pathname.includes(title.path))?.title;
};

export const haveTitle = (pathname: string) => {
  return !!pageTitles.find((title) => pathname.includes(title.path));
};

export const notShowMessagessButton = (pathname: string) => {
  return !routesWithBackButton.some((route) => pathname.includes(route));
};

export const formatDateTime = (
  dateTime: string | Date,
  variation: "primary" | "secondary" | "time" = "primary",
) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (variation === "secondary") {
    const monthNumber = date.getMonth() + 1;
    const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  if (variation === "time") {
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return `${day} de ${month} de ${year} às ${formattedHours}:${formattedMinutes} ${ampm}`;
};
