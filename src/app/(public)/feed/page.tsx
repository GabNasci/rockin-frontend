"use client";
import { useGetAllPosts } from "@/models/posts/usePosts";
import { PublicationsList } from "./_components/publications-list";

export default function Feed() {
  const { data } = useGetAllPosts();
  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px] pt-8 ">
      <PublicationsList posts={data} />
    </div>
  );
}
