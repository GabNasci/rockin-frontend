import UserAvatar from "@/components/shared/user_avatar";
import { Badge } from "@/components/ui/badge";
import { SimpleProfile } from "@/models/profiles/types";
import { TrashIcon } from "lucide-react";

type ProfileBadgeProps = {
  profile: SimpleProfile;
  handleRemove?: (id: number) => void;
  className?: string;
  onClick?: () => void;
};

export default function ProfileBadge({
  profile,
  handleRemove,
  className,
  onClick,
}: ProfileBadgeProps) {
  return (
    <Badge
      onClick={() => onClick && onClick()}
      className={`flex items-center gap-2 px-1 py-1 rounded-full text-sm ${className}`}
    >
      <UserAvatar avatar={profile.avatar} className="w-6 h-6" />
      <span>@{profile.handle}</span>
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
