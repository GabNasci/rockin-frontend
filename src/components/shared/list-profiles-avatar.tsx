import { cn, getImageUrl } from "@/lib/utils";
import { SimpleProfile } from "@/models/profiles/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ListProfilesAvatar({
  profiles,
  className,
}: {
  profiles: Omit<SimpleProfile, "members">[] | undefined;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale",
        className,
      )}
    >
      {profiles?.map((profile) => (
        <Avatar
          key={profile.id}
          className="data-[slot=avatar]:w-8 data-[slot=avatar]:h-8 data-[slot=avatar]:ring-offset-2"
        >
          <AvatarImage src={getImageUrl(profile.avatar)} />
          <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
