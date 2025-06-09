import { cn } from "@/lib/utils";
import { useLikePost, useUnlikePost } from "@/models/posts/usePosts";
import { ThumbsUpIcon } from "lucide-react";

type LikePostProps = {
  postId: number;
  liked: boolean;
};

export default function LikePost({ postId, liked }: LikePostProps) {
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const handleLike = () => {
    if (liked) {
      unlike(postId);
    } else {
      like(postId);
    }
  };
  return (
    <ThumbsUpIcon
      onClick={handleLike}
      fill={liked ? "red" : "none"}
      className={cn("w-8 h-8 cursor-pointer text-gray-400", {
        "text-primary": liked,
      })}
    />
  );
}
