"use client";
import { ProfileResponse } from "@/models/auth/types";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageUrl } from "@/lib/utils";
import { UserIcon } from "../icons";
import { SimpleProfile } from "@/models/profiles/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLastMessage } from "@/lib/firebase/hooks/useMessages";
import { Message } from "@/models/messages/type";
import { useAuth } from "@/lib/contexts/auth-context";

type ProfileHorizontalCardProps = {
  profile: ProfileResponse | SimpleProfile;
  className?: string;
  conversationId: number;
};

export function ProfileConversationCard({
  profile,
  className,
  conversationId,
}: ProfileHorizontalCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = () => {
    router.push(`/messages/${profile.handle}`);
  };

  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastMessage = async () => {
      setLoading(true);
      const message = await getLastMessage(conversationId);
      setLastMessage(message);
      setLoading(false);
    };

    fetchLastMessage();
  }, [conversationId]);

  const isFromUser = lastMessage?.profileId === user?.id;
  return (
    <Card
      onClick={() => handleClick()}
      className={`flex flex-row gap-2 px-3 py-4 w-full rounded-none cursor-pointer hover:bg-gray-100 ${className}`}
    >
      <Avatar className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100">
        <AvatarImage src={getImageUrl(profile.avatar)} />
        <AvatarFallback>
          <UserIcon className="text-gray-300" />
        </AvatarFallback>
      </Avatar>
      <CardContent className="p-0 flex flex-col gap-1">
        <CardTitle>{profile.name}</CardTitle>
        <div className="flex gap-1">
          {isFromUser && (
            <span className="text-sm font-bold text-muted-foreground">
              Você:
            </span>
          )}
          {loading ? (
            <span className="text-sm text-muted-foreground italic">
              Carregando...
            </span>
          ) : lastMessage ? (
            <span className="text-sm text-muted-foreground truncate">
              {lastMessage.text}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground italic">
              Sem mensagens
            </span>
          )}
        </div>
        <CardDescription></CardDescription>
      </CardContent>
    </Card>
  );
}
