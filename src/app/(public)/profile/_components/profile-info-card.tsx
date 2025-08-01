import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { ProfileResponse } from "@/models/auth/types";
import { FollowButton } from "./follow-button";
import { useAuth } from "@/lib/contexts/auth.context";
import { Button } from "@/components/ui/button";
import { NavigationIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/shared/user_avatar";

export function ProfileInfoCard({ user }: { user: ProfileResponse }) {
  const { user: authUser } = useAuth();
  const router = useRouter();

  const goToMessages = () => {
    router.push(`/messages/${user.handle}`);
  };

  return (
    <Card className="w-full rounded-none mt-3 border-0 shadow-none">
      <CardHeader>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 items-center w-2/3">
            <UserAvatar
              avatar={getImageUrl(user.avatar)}
              alreadyHaveUrl
              className="w-[56px] h-[56px]"
            />
            <div className="flex flex-col w-full">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className="w-3/4">
                {user.specialities.map((speciality, index) => (
                  <span key={speciality.id}>
                    {speciality.name}
                    {user.specialities.length > 1 &&
                    index !== user.specialities.length - 1
                      ? ", "
                      : ""}
                  </span>
                ))}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1 items-center text-center h-ful w-1/3">
            <h2 className="font-bold text-primary">{user.followers.length}</h2>
            <h3 className="">Apoiadores</h3>
            {authUser?.id !== user.id && (
              <FollowButton
                profileId={user.id}
                handle={user.handle}
                isFollowing={user.isFollowing}
              />
            )}
          </div>
        </div>
      </CardHeader>
      {user.about && (
        <CardContent>
          <h2 className="font-bold">Sobre:</h2>
          <p className="text-sm">{user?.about}</p>
        </CardContent>
      )}
      {user.locations?.city && user.locations?.state && (
        <CardContent className="flex gap-2">
          <h2 className="font-bold">Região:</h2>
          <p className="text-sm">{`${user.locations.city} - ${user.locations.state}`}</p>
        </CardContent>
      )}
      {authUser && authUser.id !== user.id && (
        <CardContent>
          <Button onClick={goToMessages} className="w-full mt-2">
            Enviar Mensagem{""}
            <NavigationIcon className="ml-2" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
