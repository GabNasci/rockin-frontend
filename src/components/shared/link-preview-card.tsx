import { LinkPreview } from "@/models/posts/types";
import { Card, CardDescription, CardTitle } from "../ui/card";

export default function LinkPreviewCard({
  linkPreview,
}: {
  linkPreview: LinkPreview;
}) {
  return (
    <Card className="border rounded-md p-3 mt-2 flex flex-row gap-3 items-start">
      {linkPreview?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={linkPreview?.image}
          alt="Preview"
          width={80}
          height={80}
          className="rounded object-cover"
        />
      )}
      <div>
        <CardTitle className="text-sm font-semibold">
          {linkPreview?.title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500">
          {linkPreview?.description}
        </CardDescription>
        <a
          href={linkPreview?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 underline"
        >
          {linkPreview?.url}
        </a>
      </div>
    </Card>
  );
}
