"use client";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useMultiStepForm } from "@/lib/contexts/multi-step-form.context";
import { useProfileTypes } from "@/models/profileTypes/useProfileTypes";
import {
  profileInfoSchema,
  ProfileInfoData,
} from "@/schemas/CreateProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ProfileInfoStep() {
  const { nextStep, updateData, data } = useMultiStepForm<ProfileInfoData>();
  const { data: profileTypesData } = useProfileTypes();

  const form = useForm<ProfileInfoData>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: data
      ? { ...data }
      : {
          name: "",
          handle: "",
          profileType: "",
        },
  });

  const onSubmit = (values: ProfileInfoData) => {
    updateData(values);
    nextStep();
  };
  if (!profileTypesData)
    return <Spinner size={"medium"} className="text-primary" />;

  return (
    <div>
      <CardDescription className="flex justify-center">
        Informações do seu perfil.
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
              name="profileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de perfil:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo de perfil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profileTypesData.map((profileType) => (
                        <SelectItem
                          key={profileType.id}
                          value={String(profileType.id)}
                        >
                          {profileType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full cursor-pointer" type="submit">
              Avançar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
