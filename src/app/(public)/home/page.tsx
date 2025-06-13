"use client";
import MakePostButton from "@/components/shared/make_post_button";
import HomeBanner from "./_components/home-banner";
import { useGetProfiles } from "@/models/profiles/useProfiles";
import ListProfiles from "./_components/list-profiles";
import { Loading } from "@/components/shared/loading";

export default function Home() {
  const { data, isLoading } = useGetProfiles();
  if (isLoading) return <Loading />;
  return (
    <div className="flex min-h-screen flex-col items-center pt-24">
      <HomeBanner />
      <ListProfiles profiles={data || []} />
      <MakePostButton />
    </div>
  );
}
