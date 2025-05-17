import { Card, CardHeader } from "@/components/ui/card";

type PublicationsListProps = {
  posts: { text: string }[];
};

export function PublicationsList({ posts }: PublicationsListProps) {
  return (
    <div>
      <Card className="rounded-none shadow-none border-0 pb-0 pt-3">
        <CardHeader className="font-bold text-center text-primary text-xl border-b-3 border-primary">
          Publicações
        </CardHeader>
      </Card>
      <Card className="rounded-none shadow-none border-0">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="p-3">
              <p className="text-sm">{post.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 flex justify-center w-full">
            Sem publicações
          </p>
        )}
      </Card>
    </div>
  );
}
