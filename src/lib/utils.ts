import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Option } from "@/components/shared/multi-select";
import { pageTitles, routesWithBackButton } from "./constants";
import path from "path";
import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "@/components/icons";

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
  const handle = pathname.split("/").pop();
  return handle;
}

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

export const mustHaveBackButton = (pathname: string) => {
  return routesWithBackButton
    .map((route) => path.join("/", route))
    .includes(pathname);
};

export const getTitlePage = (pathname: string) => {
  return pageTitles.find((title) => pathname.includes(title.path))?.title;
};

export const haveTitle = (pathname: string) => {
  return pageTitles.map((title) => pathname.includes(title.path));
};
