"use client";
import { Loading } from "@/components/shared/loading";
import { ProfileConversationCard } from "@/components/shared/profile-conversation-card";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useConversations } from "@/models/conversations/useConversations";
import NoConversations from "./_components/no-conversations";

export default function MessagesPage() {
  useProtectedRoute();
  const { data: conversations } = useConversations();
  if (conversations === undefined) return <Loading />;
  return (
    <div className="flex min-h-screen flex-col items-center py-20 w-full md:px-40 lg:px-80">
      {conversations.length === 0 ? (
        <NoConversations />
      ) : (
        conversations.map((conversation) => (
          <ProfileConversationCard
            key={conversation.id}
            profile={conversation.profiles[0]}
            conversationId={conversation.id}
          />
        ))
      )}
    </div>
  );
}
