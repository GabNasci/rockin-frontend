"use client";
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
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { CreateBandData, createBandSchema } from "@/schemas/CreateBandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateBandPage() {
  useProtectedRoute();

  const form = useForm<CreateBandData>({
    resolver: zodResolver(createBandSchema),
    defaultValues: {
      handle: "",
      name: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: CreateBandData) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px] pt-20 px-4">
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Crie uma Banda</CardTitle>
              <CardDescription>
                Informes as informações iniciais da banda.
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="w-full">
                Criar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
