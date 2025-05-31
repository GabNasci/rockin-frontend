"use client";
import { Loading } from "@/components/shared/loading";
import { ProfileConversationCard } from "@/components/shared/profile-conversation-card";
import { useConversations } from "@/models/conversations/useConversations";

export default function MessagesPage() {
  const { data: conversations } = useConversations();
  if (conversations === undefined) return <Loading />;
  return (
    <div className="flex min-h-screen flex-col items-center py-20">
      {conversations.map((conversation) => (
        <ProfileConversationCard
          key={conversation.id}
          profile={conversation.profiles[0]}
          conversationId={conversation.id}
        />
      ))}
    </div>
  );
}
