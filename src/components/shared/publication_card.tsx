import { PostResponse } from "@/models/posts/types";
import { Card, CardFooter } from "../ui/card";
import ProfileInfoHeader from "./profile_info_header";
import { MediaCarousel } from "./carousel";
import ProfileBadge from "./profileBadge";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useGetLinkPreview } from "@/models/posts/usePosts";
import { Skeleton } from "../ui/skeleton";
import LinkPreviewCard from "./link-preview-card";
import LikePost from "./like-post";
import { useRouter } from "next/navigation";

type PublicationCardProps = {
  post: PostResponse;
};

export default function PublicationCard({ post }: PublicationCardProps) {
  const [linkPreview, setLinkPreview] = useState(null);
  const { mutate: fetchPreview, isPending } = useGetLinkPreview();
  const router = useRouter();

  const handleClickProfile = (handle: string) => {
    router.push(`/profile/${handle}`);
  };

  useEffect(() => {
    if (post.link) {
      fetchPreview(post.link, {
        onSuccess: (data) => setLinkPreview(data),
        onError: () => setLinkPreview(null),
      });
    }
  }, [post.link]);

  return (
    <Card className="relative rounded-none gap-4 shadow-none border-0 pb-0 py-3 px-4">
      <ProfileInfoHeader profile={post.profile} />
      <div className="p-2 flex flex-col justify-center gap-2">
        <p className="text-black text-sm">{post.text}</p>
        <div className="flex justify-center w-full">
          <MediaCarousel medias={post.medias} />
        </div>
        {isPending && <Skeleton className="w-full h-16" />}
        {linkPreview && <LinkPreviewCard linkPreview={linkPreview} />}
      </div>
      <CardFooter className="px-0 flex flex-col items-start gap-2">
        <div>
          {post.tagged_profiles &&
            post.tagged_profiles.length > 0 &&
            post.tagged_profiles.map((profile) => (
              <ProfileBadge
                onClick={() => handleClickProfile(profile.handle)}
                key={profile.id}
                profile={profile}
                className="text-xs cursor-pointer"
              />
            ))}
        </div>
        <div className="flex justify-end w-full">
          <LikePost postId={post.id} liked={post.liked} />
        </div>
        <div className="flex justify-start w-full">
          <span className="text-xs text-gray-400">
            {formatDateTime(post.created_at)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
