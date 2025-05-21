import { getImageUrl } from "@/lib/utils";
import { ProfileResponse } from "@/models/auth/types";
import { SimpleProfile } from "@/models/profiles/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "../icons";
import { CardDescription, CardTitle } from "../ui/card";

type ProfileInfoHeaderProps = {
  profile: ProfileResponse | SimpleProfile;
};

export default function ProfileInfoHeader({ profile }: ProfileInfoHeaderProps) {
  return (
    <div className="flex gap-2 items-center w-2/3">
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100">
        <AvatarImage src={getImageUrl(profile.avatar)} />
        <AvatarFallback>
          <UserIcon className="text-gray-300" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <CardTitle>{profile.name}</CardTitle>
        <CardDescription className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">
          {profile.specialities.map((speciality, index) => (
            <span key={speciality.id}>
              {speciality.name}
              {index < profile.specialities.length - 1 ? ", " : ""}
            </span>
          ))}
        </CardDescription>
      </div>
    </div>
  );
}
