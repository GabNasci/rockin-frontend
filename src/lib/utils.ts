import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Option } from "@/components/shared/multi-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
