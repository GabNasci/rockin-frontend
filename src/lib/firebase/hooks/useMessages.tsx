// hooks/useMessages.ts
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  QuerySnapshot,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Message } from "@/models/messages/type";
import { useMutation } from "@tanstack/react-query";
import { useEnsureConversation } from "@/models/conversations/useConversations";

export function useMessages(conversationId?: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!!conversationId);

  useEffect(() => {
    if (!conversationId) {
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const data: Message[] = snapshot.docs.map((doc) => {
          const raw = doc.data();
          return {
            id: doc.id,
            text: raw.text,
            profileId: raw.profileId,
            conversationId: raw.conversationId,
            createdAt: raw.createdAt?.toDate?.() ?? new Date(),
          };
        });

        setMessages(data);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [conversationId]);

  return { messages, isLoading };
}

export function useSendMessage() {
  const ensureConversation = useEnsureConversation();

  return useMutation({
    mutationFn: async ({
      message,
      targetId,
    }: {
      message: Omit<Message, "conversationId">;
      targetId: number;
    }) => {
      const conversation = await ensureConversation(targetId);

      return addDoc(collection(db, "messages"), {
        ...message,
        conversationId: conversation.id,
      });
    },
  });
}
