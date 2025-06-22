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
import { ProfileTypeID } from "@/lib/constants";
import { MembersList } from "../_components/members-list";
import { useGetMembersByBandProfileId } from "@/models/bands/useBands";
import { AddMembersDialog } from "../_components/add-members.dialog";
import { useState } from "react";

export default function ProfilePage() {
  const { handle } = useParams() as { handle: string };
  const { data, isLoading, isError } = useGetProfileByHandle(handle);
  const { data: posts, isLoading: isPostsLoading } = useGetPostsByProfileId(
    data?.id,
    !!data?.id,
  );
  const { data: members, isLoading: isMembersLoading } =
    useGetMembersByBandProfileId(data?.id, !!data?.id);
  const [open, setOpen] = useState(false);
  console.log(open);
  if (!data && !isError && isLoading) return <Loading />;

  if (!data) return notFound();

  return (
    <div className="flex min-h-screen flex-col gap-3 pt-[56px]">
      <ProfileInfoCard user={data} />
      <GenresList genres={data.genres} />
      {data.profile_type_id === ProfileTypeID.MUSICIAN && (
        <BandsList bands={data.bands} />
      )}
      {data.profile_type_id === ProfileTypeID.BAND && (
        <MembersList
          members={members}
          isLoading={isMembersLoading}
          openDialog={() => setOpen(true)}
        />
      )}
      <PublicationsList posts={posts} isLoading={isPostsLoading} />
      <AddMembersDialog members={members} open={open} setOpen={setOpen} />
    </div>
  );
}
