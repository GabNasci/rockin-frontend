"use client";

import { useRouter } from "next/navigation";
import { ComponentType } from "react";

interface NavButtonProps {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
}

export function NavButton({
  href,
  label,
  icon: Icon,
  isActive,
}: NavButtonProps) {
  const router = useRouter();

  return (
    <button
      className={`flex flex-col items-center cursor-pointer hover:bg-background gap-1 w-full py-4 transition ${
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
}
