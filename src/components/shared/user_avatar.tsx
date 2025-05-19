import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
  avatar,
  className,
}: {
  avatar: string | null;
  className?: string;
}) {
  return (
    <Avatar
      className={`w-6 h-6 flex items-center justify-center bg-gray-100 ${className || ""}`}
    >
      <AvatarImage src={getImageUrl(avatar)} />
      <AvatarFallback>
        <UserIcon className="text-gray-300" />
      </AvatarFallback>
    </Avatar>
  );
}
