import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
  avatar,
  className,
  alreadyHaveUrl = false,
}: {
  avatar: string | null;
  className?: string;
  alreadyHaveUrl?: boolean;
}) {
  return (
    <Avatar
      className={`w-6 h-6 flex items-center justify-center bg-gray-100 ${className || ""}`}
    >
      <AvatarImage
        className="w-full object-cover"
        src={alreadyHaveUrl ? (avatar ?? "") : getImageUrl(avatar)}
      />
      <AvatarFallback>
        <UserIcon className="text-gray-300" />
      </AvatarFallback>
    </Avatar>
  );
}
