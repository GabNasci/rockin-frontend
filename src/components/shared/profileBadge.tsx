import UserAvatar from "@/components/shared/user_avatar";
import { Badge } from "@/components/ui/badge";
import { SimpleProfile } from "@/models/profiles/types";
import { TrashIcon } from "lucide-react";

type ProfileBadgeProps = {
  profile: SimpleProfile;
  handleRemove?: (id: number) => void;
};

export default function ProfileBadge({
  profile,
  handleRemove,
}: ProfileBadgeProps) {
  return (
    <Badge className="flex items-center gap-2 px-1 py-1 rounded-full">
      <UserAvatar avatar={profile.avatar} className="w-6 h-6" />
      <span className="text-sm">@{profile.handle}</span>
      <div className="pe-1">
        {handleRemove && (
          <TrashIcon
            size={20}
            className="cursor-pointer"
            onClick={() => handleRemove(profile.id)}
          />
        )}
      </div>
    </Badge>
  );
}
