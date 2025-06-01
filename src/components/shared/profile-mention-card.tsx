import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { SimpleProfile } from "@/models/profiles/types";
import { CheckIcon } from "lucide-react";

type ProfileMentionCardProps = {
  profile: ProfileResponse | SimpleProfile;
  onAdd?: (profile: SimpleProfile) => void;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
};

export function ProfileMentionCard({
  profile,
  onAdd,
  className,
  disabled,
  selected,
}: ProfileMentionCardProps) {
  const handleAdd = (profile: SimpleProfile | ProfileResponse) => {
    if (onAdd) {
      onAdd(profile);
    }
  };

  return (
    <Card
      onClick={() => !disabled && handleAdd(profile)}
      className={`flex flex-row justify-between px-3 py-3 w-full cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : "hover:bg-muted"
      } ${className}`}
    >
      <div className="flex flex-row gap-2 items-center">
        <Avatar
          className={`w-[40px] h-[40px] flex items-center justify-center bg-gray-100 ${
            disabled ? "grayscale" : ""
          }`}
        >
          <AvatarImage src={getImageUrl(profile.avatar)} />
          <AvatarFallback>
            <UserIcon className="text-gray-300" />
          </AvatarFallback>
        </Avatar>
        <CardContent className="p-0 flex flex-col gap-1">
          <CardTitle
            className={`${disabled ? "text-gray-400" : "text-foreground"}`}
          >
            {profile.name}
          </CardTitle>
          <CardDescription
            className={`text-sm ${
              disabled ? "text-gray-400" : "text-muted-foreground"
            }`}
          >
            @{profile.handle}
          </CardDescription>
        </CardContent>
      </div>
      {selected && <CheckIcon />}
    </Card>
  );
}
