import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { Badge } from "../ui/badge";

type ProfileHorizontalCardProps = {
  profile: ProfileResponse;
};

export function ProfileHorizontalCard({ profile }: ProfileHorizontalCardProps) {
  return (
    <Card className="flex flex-row gap-2 px-3 py-3 w-full">
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100">
        <AvatarImage src={getImageUrl(profile.avatar)} />
        <AvatarFallback>
          <UserIcon className="text-gray-300" />
        </AvatarFallback>
      </Avatar>
      <CardContent className="p-0 flex flex-col gap-1">
        <CardTitle>{profile.name}</CardTitle>
        <div className="flex gap-2">
          {profile?.genres?.map((genre) => (
            <Badge
              key={genre.id}
              className="bg-primary text-white font-bold text-xs rounded-full"
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
