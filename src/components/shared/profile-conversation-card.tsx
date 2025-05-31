"use client";
import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { SimpleProfile } from "@/models/profiles/types";
import { useRouter } from "next/navigation";

type ProfileHorizontalCardProps = {
  profile: ProfileResponse | SimpleProfile;
  className?: string;
};

export function ProfileConversationCard({
  profile,
  className,
}: ProfileHorizontalCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/messages/${profile.handle}`);
  };

  return (
    <Card
      onClick={() => handleClick()}
      className={`flex flex-row gap-2 px-3 py-3 w-full rounded-none cursor-pointer hover:bg-gray-100 ${className}`}
    >
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100">
        <AvatarImage src={getImageUrl(profile.avatar)} />
        <AvatarFallback>
          <UserIcon className="text-gray-300" />
        </AvatarFallback>
      </Avatar>
      <CardContent className="p-0 flex flex-col gap-1">
        <CardTitle>{profile.name}</CardTitle>
      </CardContent>
    </Card>
  );
}
