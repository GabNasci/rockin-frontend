import Loader from "@/components/shared/loader";
import PublicationCard from "@/components/shared/publication_card";
import { Card, CardHeader } from "@/components/ui/card";
import { PostResponse } from "@/models/posts/types";

type PublicationsListProps = {
  posts: PostResponse[] | undefined;
  isLoading?: boolean;
};

export function PublicationsList({ posts, isLoading }: PublicationsListProps) {
  return (
    <div className="pb-50 w-full md:px-40 lg:px-80">
      <Card className="rounded-none shadow-none border-0 pt-0 bg-transparent">
        <CardHeader className="pt-3 bg-white font-bold text-center text-primary text-xl border-b-3 border-primary">
          Feed
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-4 pt-3">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PublicationCard key={index} post={post} />
          ))
        ) : isLoading ? (
          <Loader className="w-10 h-10" />
        ) : (
          <p className="text-gray-400 flex justify-center w-full">
            Sem publicações
          </p>
        )}
      </div>
    </div>
  );
}
