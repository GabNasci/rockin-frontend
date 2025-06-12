"use client";
import { Loading } from "@/components/shared/loading";
import MultipleSelector from "@/components/shared/multi-select";
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
import { Textarea } from "@/components/ui/textarea";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/lib/contexts/auth-context";
import { mapToOptions } from "@/lib/utils";
import { useGenres } from "@/models/genres/useGenres";
import { useSpecialitiesByProfileType } from "@/models/specialities/useSpecialities";
import {
  EditProfileData,
  editProfileSchema,
} from "@/schemas/EditProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditProfilePage() {
  useProtectedRoute();
  const { user } = useAuth();
  const { data: genresData } = useGenres();
  const { data: specialitiesData, isLoading } = useSpecialitiesByProfileType(
    user?.profile_type_id,
    !!user?.profile_type_id,
  );
  const form = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      about: "",
      genres: [],
      specialities: [],
      handle: "",
      name: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      about: user.about ?? "",
      genres: user.genres?.map((g) => String(g.id)) ?? [],
      specialities: user.specialities?.map((s) => String(s.id)) ?? [],
      handle: user.handle ?? "",
      name: user.name ?? "",
    });
  }, [user, form]);

  if (!user && !genresData && !specialitiesData && isLoading)
    return <Loading />;

  const genresOptions = mapToOptions(
    genresData,
    (g) => g.name,
    (g) => g.id,
  );

  const specialitiesOptions = mapToOptions(
    specialitiesData,
    (s) => s.name,
    (s) => s.id,
  );

  const { control, handleSubmit } = form;

  const onSubmit = (values: EditProfileData) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px] pt-20 px-4">
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
              <CardDescription>
                Edite as informações do seu perfil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira um nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário:</FormLabel>
                    <FormControl>
                      <Input placeholder="@" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobre:</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Escreva sobre você"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="genres"
                render={({ field }) => {
                  const selectedOptions = genresOptions.filter((opt) =>
                    field.value?.includes(opt.value),
                  );

                  return (
                    <FormItem>
                      <FormLabel>Gêneros:</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={selectedOptions}
                          onChange={(newOptions) => {
                            const newIds = newOptions.map((opt) => opt.value);
                            field.onChange(newIds);
                          }}
                          defaultOptions={genresOptions}
                          options={genresOptions}
                          placeholder="Selecione os gêneros..."
                          emptyIndicator={
                            <p className="text-center text-sm leading-1 text-muted-foreground">
                              Nenhum resultado encontrado.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="specialities"
                render={({ field }) => {
                  const selectedOptions = specialitiesOptions.filter((opt) =>
                    field.value?.includes(opt.value),
                  );

                  return (
                    <FormItem>
                      <FormLabel>Especialidades:</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={selectedOptions}
                          onChange={(newOptions) => {
                            const newIds = newOptions.map((opt) => opt.value);
                            field.onChange(newIds);
                          }}
                          defaultOptions={specialitiesOptions}
                          options={specialitiesOptions}
                          placeholder="Selecione as especialidades..."
                          emptyIndicator={
                            <p className="text-center text-sm leading-1 text-muted-foreground">
                              Nenhum resultado encontrado.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="reset">
                Limpar
              </Button>
              <Button type="submit">Salvar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
