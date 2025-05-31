"use client";
// import { useAuth } from "@/lib/contexts/auth-context";
import { useGetProfileByHandle } from "@/models/profiles/useProfiles";
import { notFound, useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { NavInput } from "./_components/nav-input";
import { Message } from "@/models/messages/type";
import MessageText from "./_components/message-text";
import { useAuth } from "@/lib/contexts/auth-context";

const messages: Message[] | undefined = [
  {
    id: 1,
    text: "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    profileId: 10,
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Estou bem e você?",
    profileId: 1,
    createdAt: new Date(),
  },
];

export default function ConversationPage() {
  const { handle } = useParams() as { handle: string };
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetProfileByHandle(handle);

  if (!user) return <Loading />;

  if (!data && !isError && isLoading) return <Loading />;

  if (!data) return notFound();

  return (
    <div className="flex min-h-screen flex-col gap-3 pt-[56px]">
      <div className="mt-4">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <MessageText
              key={message.id}
              message={message}
              isSender={user.id === message.profileId}
            />
          ))}
      </div>
      <NavInput />
    </div>
  );
}
