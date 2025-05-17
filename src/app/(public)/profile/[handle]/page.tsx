"use client";
import { Spinner } from "@/components/ui/spinner";
import { ProfileInfoCard } from "../_components/profile-info-card";
// import { useAuth } from "@/lib/contexts/auth-context";
import { useGetProfileByHandle } from "@/models/profiles/useProfiles";
import { useParams } from "next/navigation";
import { GenresList } from "../_components/genres-list";
import { BandsList } from "../_components/bands-list";

export default function ProfilePage() {
  const { handle } = useParams() as { handle: string };
  const { data } = useGetProfileByHandle(handle);
  // const { user } = useAuth();

  if (!data) return <Spinner size={"medium"} className="text-primary" />;
  return (
    <div className="flex min-h-screen flex-col gap-3 pt-[56px]">
      <ProfileInfoCard user={data} />
      <GenresList genres={data.genres} />
      <BandsList bands={data.bands} />
    </div>
  );
}
