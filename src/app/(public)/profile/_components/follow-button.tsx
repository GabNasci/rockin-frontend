import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";

type FollowButtonProps = {
  profileId: number;
};

export function FollowButton({ profileId }: FollowButtonProps) {
  const { user } = useAuth();
  const isFollowing = () => {
    return user?.following?.some(
      (recomendation) => recomendation.followingId === profileId,
    );
  };

  return (
    <Button
      variant={isFollowing() ? "outline" : "default"}
      className="w-full md:w-auto font-bold cursor-pointer"
      onClick={() => {}}
    >
      {isFollowing() ? "Deixar de apoiar" : "Apoiar"}
    </Button>
  );
}
