"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreatePostData, createPostSchema } from "@/schemas/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/shared/user_avatar";
import { useAuth } from "@/lib/contexts/auth.context";
import { Loading } from "@/components/shared/loading";
import { CustomFileInput } from "@/components/shared/custom_file_input";
import { useCreatePost, useGetLinkPreview } from "@/models/posts/usePosts";
import { Input } from "@/components/ui/input";
import { SimpleProfile } from "@/models/profiles/types";
import ProfileBadge from "../../../../components/shared/profileBadge";
import { AddProfileDialog } from "./_components/add-profile.dialog";
import { X } from "lucide-react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import LinkPreviewCard from "@/components/shared/link-preview-card";

export default function AddPostPage() {
  useProtectedRoute();
  const [files, setFiles] = useState<File[]>([]);
  const [linkValue, setLinkValue] = useState<string>("");
  const [taggedProfiles, setProfiles] = useState<SimpleProfile[]>([]);
  const [linkPreview, setLinkPreview] = useState<{
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  } | null>(null);

  const { mutate: fetchLinkPreview } = useGetLinkPreview();
  const { mutate: createPost } = useCreatePost();
  const { user } = useAuth();
  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      text: "",
      medias: [],
      link: "",
    },
  });

  const { control, handleSubmit } = form;

  const watchedLink = form.watch("link");

  const linkIsloading = linkValue.length > 0 && !linkPreview;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (watchedLink && watchedLink.startsWith("http")) {
        fetchLinkPreview(watchedLink, {
          onSuccess: (data) => {
            setLinkPreview(data);
          },
          onError: () => setLinkPreview(null),
        });
      } else {
        setLinkPreview(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [watchedLink]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const onlyImages = selected.filter((file) =>
      file.type.startsWith("image/"),
    );
    setFiles((prev) => [...prev, ...onlyImages]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: CreatePostData) => {
    createPost({
      ...values,
      medias: files,
      tagged_profiles: taggedProfiles.map((profile) => profile.id),
    });
  };

  if (!user) return <Loading />;

  return (
    <div className=" mt-20 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full border-0 rounded-none shadow-none m-0 px-4">
            <div className="flex w-full">
              <UserAvatar avatar={user.avatar} className="w-10 h-10" />
              <div className="flex-1">
                <FormField
                  control={control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="resize-none w-full shadow-none border-0 focus-visible:ring-0 h-32"
                          placeholder="Escreva sobre sua publicação..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {files.length > 0 && (
              <div className="space-y-2 my-3">
                <div className="grid grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image
                        key={index}
                        width={100}
                        height={100}
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-28 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600 transition"
                      >
                        <X size={16} className="hover:cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <CustomFileInput
              name="medias"
              control={control}
              form={form}
              handleFileChange={handleFileChange}
            />
            <div className="flex flex-wrap">
              {taggedProfiles.length > 0 &&
                taggedProfiles.map((profile) => (
                  <ProfileBadge key={profile.id} profile={profile} />
                ))}
              <AddProfileDialog
                taggedProfiles={taggedProfiles}
                setProfiles={setProfiles}
              />
            </div>

            <FormField
              control={control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={linkValue}
                      onChange={(e) => {
                        field.onChange(e);
                        setLinkValue(e.target.value);
                      }}
                      placeholder="Digite um link..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {linkIsloading && <Skeleton className="w-full h-16" />}
            {linkPreview && <LinkPreviewCard linkPreview={linkPreview} />}
          </Card>
          <div className="mt-4 flex justify-end px-3">
            <Button
              disabled={linkIsloading}
              className="cursor-pointer text-lg font-bold"
              type="submit"
            >
              Publicar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
