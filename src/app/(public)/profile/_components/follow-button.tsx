import { Button } from "@/components/ui/button";
import { useRequireAuthAction } from "@/lib/firebase/hooks/useRequireAuthAction";
import {
  useFollowProfile,
  useUnFollowProfile,
} from "@/models/profiles/useProfiles";

type FollowButtonProps = {
  profileId: number;
  handle: string;
  isFollowing: boolean;
};

export function FollowButton({
  profileId,
  handle,
  isFollowing,
}: FollowButtonProps) {
  const { mutate: follow } = useFollowProfile(handle);
  const { mutate: unfollow } = useUnFollowProfile(handle);
  const requireAuth = useRequireAuthAction();
  const handleFollow = requireAuth(() => {
    if (isFollowing) {
      unfollow(profileId);
    } else {
      follow(profileId);
    }
  });

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className="w-full md:w-auto font-bold cursor-pointer break-words whitespace-normal"
      onClick={() => handleFollow()}
    >
      {isFollowing ? "Deixar de apoiar" : "Apoiar"}
    </Button>
  );
}
