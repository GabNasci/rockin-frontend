import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { Badge } from "../ui/badge";
import { ProfileTypeID } from "@/lib/constants";
import { SimpleProfile } from "@/models/profiles/types";

type ProfileHorizontalCardProps = {
  profile: ProfileResponse | SimpleProfile;
  onAdd?: (profile: SimpleProfile) => void;
  className?: string;
};

export function ProfileHorizontalCard({
  profile,
  onAdd,
  className,
}: ProfileHorizontalCardProps) {
  const handleAdd = (profile: SimpleProfile | ProfileResponse) => {
    if (onAdd) {
      onAdd(profile);
    }
  };

  return (
    <Card
      onClick={() => handleAdd(profile)}
      className={`flex flex-row gap-2 px-3 py-3 w-full ${className}`}
    >
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100">
        <AvatarImage src={getImageUrl(profile.avatar)} />
        <AvatarFallback>
          <UserIcon className="text-gray-300" />
        </AvatarFallback>
      </Avatar>
      <CardContent className="p-0 flex flex-col gap-1">
        <CardTitle>{profile.name}</CardTitle>
        <CardDescription>@{profile.handle}</CardDescription>
        <div className="flex gap-2">
          {profile?.profile_type_id === ProfileTypeID.BAND
            ? profile?.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  className="bg-primary text-white font-bold text-xs rounded-full"
                >
                  {genre.name}
                </Badge>
              ))
            : profile?.specialities?.map((s) => s.name).join(", ")}
        </div>
      </CardContent>
    </Card>
  );
}
