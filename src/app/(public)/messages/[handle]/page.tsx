"use client";
// import { useAuth } from "@/lib/contexts/auth-context";
import { useGetProfileByHandle } from "@/models/profiles/useProfiles";
import { notFound, useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { NavInput } from "./_components/nav-input";
import MessageText from "./_components/message-text";
import { useAuth } from "@/lib/contexts/auth-context";
import { useGetConversation } from "@/models/conversations/useConversations";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  sendMessageSchema,
  SendMessageSchema,
} from "@/schemas/SendMessageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMessages, useSendMessage } from "@/lib/firebase/hooks/useMessages";
import { useEffect, useRef } from "react";
import NoneMessages from "./_components/none-messages";
import Loader from "@/components/shared/loader";

export default function ConversationPage() {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const { handle } = useParams() as { handle: string };
  const { user } = useAuth();
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetProfileByHandle(handle);
  const { data: conversationData } = useGetConversation(
    profileData?.id,
    !!profileData,
  );
  const { messages, isLoading: isLoadingMessages } = useMessages(
    conversationData?.id,
  );
  const { mutate } = useSendMessage();

  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const { control, handleSubmit } = form;

  if (!user) return <Loading />;

  if (!profileData && !isError && isLoading) return <Loading />;

  if (!profileData) return notFound();

  const onSubmit = (values: SendMessageSchema) => {
    if (!profileData?.id) return;
    mutate({
      message: {
        text: values.text,
        profileId: user.id,
        createdAt: new Date(),
      },
      targetId: profileData?.id,
    });
    form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col gap-3 pt-[56px] mb-20">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
          className="space-y-8"
        >
          <div className="mt-4">
            {isLoadingMessages ? (
              <Loader />
            ) : messages.length > 0 ? (
              messages.map((message, index) => (
                <MessageText
                  key={index}
                  message={message}
                  isSender={user.id === message.profileId}
                />
              ))
            ) : (
              <NoneMessages />
            )}
            <div ref={endOfMessagesRef} />
          </div>
          <FormField
            control={control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NavInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
