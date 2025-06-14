import { ProfileResponse } from "@/models/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getImageUrl } from "@/lib/utils";
import { FollowButton } from "@/app/(public)/profile/_components/follow-button";

type Props = {
  profile: ProfileResponse;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <Card className="w-[128px] h-[190px] p-2 rounded-md shadow-md gap-2 flex flex-col justify-between">
      <CardHeader className="flex justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={getImageUrl(profile?.avatar)}
            alt={`Imagem de ${profile?.name}`}
          />
          <AvatarFallback>
            {profile?.name
              ?.split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1 justify-center">
        <CardTitle className="truncate text-center w-full">
          {profile?.name}
        </CardTitle>
        <CardDescription className="truncate text-center w-full">
          {profile?.specialities?.map((s) => s.name).join(", ")}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center w-full p-0">
        <FollowButton
          handle={profile.handle}
          isFollowing={profile.isFollowing}
          profileId={profile.id}
        />
      </CardFooter>
    </Card>
  );
}
