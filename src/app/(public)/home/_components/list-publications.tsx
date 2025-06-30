"use client";
import Loader from "@/components/shared/loader";
import PublicationCard from "@/components/shared/publication_card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PostResponse } from "@/models/posts/types";
import { useRouter } from "next/navigation";

type ListPublicationsProps = {
  posts: PostResponse[] | undefined;
  isLoading?: boolean;
};

export function ListPublications({ posts, isLoading }: ListPublicationsProps) {
  const router = useRouter();
  const goToFeed = () => {
    router.push("feed");
  };

  if (!posts) return null;

  return (
    <div className="pb-50 flex flex-col gap-2 w-full md:px-40 lg:px-80">
      <Card className="rounded-none shadow-none border-0 pt-0 bg-transparent">
        <CardHeader className="pt-3 bg-white font-bold text-center text-primary text-xl border-b-3 border-primary">
          Últimas publicações
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-">
        {posts && posts.length > 0 ? (
          posts
            .slice(0, 3)
            .map((post) => <PublicationCard key={post.id} post={post} />)
        ) : isLoading ? (
          <Loader className="w-10 h-10" />
        ) : (
          <p className="text-gray-400 flex justify-center w-full">
            Sem publicações
          </p>
        )}
      </div>
      <div className="flex justify-center w-full">
        <Button variant="link" onClick={goToFeed} className="text-primary">
          Ver mais
        </Button>
      </div>
    </div>
  );
}
