import { UserIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { ProfileResponse } from "@/models/auth/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FollowButton } from "./follow-button";
import { useAuth } from "@/lib/contexts/auth-context";

export function ProfileInfoCard({ user }: { user: ProfileResponse }) {
  const { user: authUser } = useAuth();

  return (
    <Card className="w-full rounded-none mt-3 border-0 shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center w-2/3">
            <Avatar className="w-[56px] h-[56px] flex items-center justify-center bg-gray-100">
              <AvatarImage src={getImageUrl(user.avatar)} />
              <AvatarFallback>
                <UserIcon className="text-gray-300" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className="w-2/3">
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
            {authUser && authUser.id !== user.id && (
              <FollowButton profileId={user.id} />
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
      {user.locations.city && user.locations.state && (
        <CardContent className="flex gap-2">
          <h2 className="font-bold">Região:</h2>
          <p className="text-sm">{`${user.locations.city} - ${user.locations.state}`}</p>
        </CardContent>
      )}
    </Card>
  );
}
