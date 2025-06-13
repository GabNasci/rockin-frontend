"use client";
import MakePostButton from "@/components/shared/make_post_button";
import HomeBanner from "./_components/home-banner";
import { useGetProfiles } from "@/models/profiles/useProfiles";
import ListProfiles from "./_components/list-profiles";
import { Loading } from "@/components/shared/loading";
import { ListPublications } from "./_components/list-publications";
import { useGetAllPosts } from "@/models/posts/usePosts";

export default function Home() {
  const { data: profiles, isLoading } = useGetProfiles();
  const { data: posts, isLoading: isLoadingPosts } = useGetAllPosts();
  if (isLoading || isLoadingPosts) return <Loading />;
  return (
    <div className="flex min-h-screen flex-col items-center pt-24">
      <HomeBanner />
      <ListProfiles profiles={profiles || []} />
      <ListPublications posts={posts} isLoading={isLoadingPosts} />
      <MakePostButton />
    </div>
  );
}
