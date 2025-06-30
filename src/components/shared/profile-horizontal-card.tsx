import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { getImageUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ProfileTypeID } from "@/lib/constants";
import { SimpleProfile } from "@/models/profiles/types";
import ListProfilesAvatar from "./list-profiles-avatar";
import UserAvatar from "./user_avatar";

type ProfileHorizontalCardProps = {
  profile: ProfileResponse | SimpleProfile;
  onClick?: () => void;
  onAdd?: (profile: SimpleProfile) => void;
  className?: string;
};

export function ProfileHorizontalCard({
  profile,
  onAdd,
  onClick,
  className,
}: ProfileHorizontalCardProps) {
  const handleAdd = (profile: SimpleProfile | ProfileResponse) => {
    if (onAdd) {
      onAdd(profile);
    } else {
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <Card
      onClick={() => handleAdd(profile)}
      className={`flex flex-row gap-2 px-3 py-3 w-full ${className}`}
    >
      <UserAvatar
        className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100"
        avatar={getImageUrl(profile.avatar)}
        alreadyHaveUrl
      />
      <CardContent className="p-0 flex flex-row justify-between w-full">
        <div className="p-0 flex flex-col w-full">
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
        </div>
        {profile?.profile_type_id === ProfileTypeID.BAND && (
          <ListProfilesAvatar profiles={profile?.band?.members} />
        )}
      </CardContent>
    </Card>
  );
}
