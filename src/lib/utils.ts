import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Option } from "@/components/shared/multi-select";

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

export function getImageUrl(imageName: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${baseUrl}/uploads/${imageName}`;
}
