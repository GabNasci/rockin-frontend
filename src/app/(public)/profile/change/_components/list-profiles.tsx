import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { cn } from "@/lib/utils";
import { ProfileResponse } from "@/models/auth/types";

type ListProfilesProps = {
  profiles: ProfileResponse[];
  currentProfileId?: number;
  selectedProfileId?: number;
  onSelectProfile: (id: number) => void;
};

export function ListProfiles({
  profiles,
  currentProfileId,
  selectedProfileId,
  onSelectProfile,
}: ListProfilesProps) {
  return (
    <div className="flex flex-col justify-start gap-4 w-full">
      <h1 className="font-bold">Perfis:</h1>
      <div className="flex flex-col gap-4">
        {profiles.map((profile) => {
          const isCurrent = profile.id === currentProfileId;
          const isSelected = profile.id === selectedProfileId;

          return (
            <ProfileHorizontalCard
              className={cn(
                "cursor-pointer",
                isCurrent && "opacity-50",
                isSelected && "border-2 border-primary",
              )}
              key={profile.id}
              profile={profile}
              onClick={() => onSelectProfile(profile.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
