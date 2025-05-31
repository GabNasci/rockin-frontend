import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Message } from "@/models/messages/type";

export type MessageTextProps = {
  message: Message;
  isSender?: boolean;
};

export default function MessageText({ message, isSender }: MessageTextProps) {
  if (isSender)
    return (
      <div className="flex flex-row-reverse gap-1 px-4 mb-4">
        <Card className="flex flex-col gap-1 p-4 w-fit border-none rounded-br-none bg-primary max-w-5/6">
          <p className="text-sm text-white break-words">{message.text}</p>
          <div className="flex flex-row-reverse gap-1">
            <span className="text-xs text-gray-800">
              {formatDateTime(message.createdAt, "secondary")}
            </span>
          </div>
        </Card>
      </div>
    );

  return (
    <div className="flex gap-1 px-4 mb-4">
      <Card className="flex flex-col gap-1 p-4 w-fit rounded-bl-none bg-white max-w-5/6">
        <p className="text-sm text-black break-words">{message.text}</p>
        <div className="flex gap-1">
          <span className="text-xs text-gray-800">
            {formatDateTime(message.createdAt, "secondary")}
          </span>
        </div>
      </Card>
    </div>
  );
}
