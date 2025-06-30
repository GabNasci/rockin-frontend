import { LinkPreview } from "@/models/posts/types";
import { Card, CardDescription, CardTitle } from "../ui/card";

export default function LinkPreviewCard({
  linkPreview,
}: {
  linkPreview: LinkPreview;
}) {
  return (
    <Card className="border rounded-md p-3 mt-2 flex flex-row gap-3 items-start w-full">
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
      <div className="w-full break-words overflow-hidden">
        <CardTitle className="text-sm font-semibold w-full break-words">
          {linkPreview?.title}
        </CardTitle>
        <CardDescription className="text-xs w-full text-gray-500 break-words">
          {linkPreview?.description}
        </CardDescription>
        <a
          href={linkPreview?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs w-full text-blue-500 underline break-words"
        >
          {linkPreview?.url}
        </a>
      </div>
    </Card>
  );
}
