"use client";
import { ProfileInfoCard } from "../_components/profile-info-card";
// import { useAuth } from "@/lib/contexts/auth-context";
import { useGetProfileByHandle } from "@/models/profiles/useProfiles";
import { notFound, useParams } from "next/navigation";
import { GenresList } from "../_components/genres-list";
import { BandsList } from "../_components/bands-list";
import { Loading } from "@/components/shared/loading";
import { PublicationsList } from "../_components/publications-list";
import { useGetPostsByProfileId } from "@/models/posts/usePosts";

export default function ProfilePage() {
  const { handle } = useParams() as { handle: string };
  const { data, isLoading, isError } = useGetProfileByHandle(handle);
  const { data: posts, isLoading: isPostsLoading } = useGetPostsByProfileId(
    data?.id,
  );

  if (!data && !isError && isLoading) return <Loading />;

  if (!data) return notFound();

  return (
    <div className="flex min-h-screen flex-col gap-3 pt-[56px]">
      <ProfileInfoCard user={data} />
      <GenresList genres={data.genres} />
      <BandsList bands={data.bands} />
      <PublicationsList posts={posts} isLoading={isPostsLoading} />
    </div>
  );
}
