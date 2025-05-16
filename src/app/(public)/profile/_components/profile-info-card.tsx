import { UserIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { MeResponse } from "@/models/auth/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function ProfileInfoCard({ user }: { user: MeResponse }) {
  return (
    <Card className="w-full rounded-none mt-3 border-0 shadow-none">
      <CardHeader>
        <div className="flex gap-2 items-center">
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
      </CardHeader>
    </Card>
  );
}
