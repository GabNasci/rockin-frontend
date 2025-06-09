"use client";
import Loader from "@/components/shared/loader";
import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { SearchProfilesResponse, SimpleProfile } from "@/models/profiles/types";
import PaginationControl from "./pagination-control";
import NoProfilesFound from "./no-profiles-found";
import { useRouter } from "next/navigation";

export default function ProfilesPaginationList({
  data,
  isLoading,
  onPageChange,
}: {
  data: SearchProfilesResponse | undefined;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}) {
  const router = useRouter();
  if (isLoading) {
    return <Loader className="h-10 w-10 " />;
  }

  if (!data) {
    return <NoProfilesFound />;
  }

  if (data.profiles.length === 0) {
    return <NoProfilesFound />;
  }

  const onOpenProfile = (profile: SimpleProfile) => {
    router.push(`/profile/${profile.handle}`);
  };

  return (
    <div>
      <div className="flex flex-col">
        {data?.profiles.map((profile) => (
          <ProfileHorizontalCard
            className="w-full rounded-none py-6 hover:bg-gray-50 cursor-pointer"
            onClick={() => onOpenProfile(profile)}
            key={profile.id}
            profile={profile}
          />
        ))}
      </div>

      <PaginationControl
        page={data.page}
        totalPages={data.totalPages}
        onPageChange={onPageChange}
        isFirstPage={data.isFirstPage}
        isLastPage={data.isLastPage}
      />
    </div>
  );
}
