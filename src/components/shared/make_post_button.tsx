"use client";
import { useAuth } from "@/lib/contexts/auth-context";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MakePostButton() {
  const { user } = useAuth();

  const router = useRouter();

  const onClick = () => router.push("post/add");

  if (!user) return null;
  return (
    <div
      onClick={onClick}
      className=" absolute bottom-26 flex justify-center items-center rounded-full right-6 bg-primary cursor-pointer w-12 h-12"
    >
      <PencilIcon color="white" />
    </div>
  );
}
