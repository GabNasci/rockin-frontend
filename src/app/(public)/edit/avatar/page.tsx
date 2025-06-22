"use client";

import { ConfirmDialog } from "@/components/shared/dialog/confirm.dialog";
import { Loading } from "@/components/shared/loading";
import UserAvatar from "@/components/shared/user_avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/lib/contexts/auth.context";
import {
  useDeleteProfileAvatar,
  useEditAvatar,
} from "@/models/profiles/useProfiles";
import {
  UpdateProfileAvatarData,
  updateProfileAvatarSchema,
} from "@/schemas/UpdateProfileAvatarSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditAvatarPage() {
  useProtectedRoute();
  const { user } = useAuth();
  const { mutate: editAvatar, isPending } = useEditAvatar();
  const { mutate: deleteAvatar } = useDeleteProfileAvatar();
  const [preview, setPreview] = useState<string | undefined>(
    user?.avatar ?? undefined,
  );
  const [fileSelected, setFileSelected] = useState<boolean>(false);

  const form = useForm<UpdateProfileAvatarData>({
    resolver: zodResolver(updateProfileAvatarSchema),
  });

  const { control, handleSubmit, watch } = form;

  const avatarWatch = watch("avatar");

  useEffect(() => {
    const file = avatarWatch instanceof File ? avatarWatch : null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileSelected(true);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(user?.avatar ?? "");
      setFileSelected(false);
    }
  }, [avatarWatch, user?.avatar]);

  if (!user) return <Loading />;

  const onRemove = () => {
    deleteAvatar();
  };

  const onSubmit = (values: UpdateProfileAvatarData) => {
    editAvatar(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px] pt-20 px-4">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
            className="space-y-8"
          >
            <CardHeader>
              <CardTitle>Editar Foto de Perfil</CardTitle>
              <CardDescription>Edite a sua imagem de perfil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <UserAvatar
                  avatar={preview ?? null}
                  alreadyHaveUrl={fileSelected}
                  className="w-32 h-32"
                />
              </div>
              <FormField
                control={control}
                name="avatar"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <ConfirmDialog
                title="Remover foto de perfil"
                description="Tem certeza que deseja remover a foto de perfil?"
                onConfirm={onRemove}
              >
                <Button variant="outline" type="button">
                  Remover foto
                </Button>
              </ConfirmDialog>
              <Button type="submit" disabled={!fileSelected || isPending}>
                {isPending ? (
                  <Spinner size={"small"} className="mr-2 text-white" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
