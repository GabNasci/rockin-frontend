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
import { Spinner } from "@/components/ui/spinner";
import { useMultiStepForm } from "@/lib/contexts/multi-step-form.context";
import { isEmptyObject } from "@/lib/utils";
import { useCheckEmail } from "@/models/profiles/useProfiles";
import {
  CredentialsData,
  credentialsSchema,
} from "@/schemas/CreateProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CredentialsStep() {
  const { nextStep, data, updateData } = useMultiStepForm<CredentialsData>();
  const { mutate: checkEmail, isPending } = useCheckEmail();

  const form = useForm<CredentialsData>({
    resolver: zodResolver(credentialsSchema),
    defaultValues:
      data && !isEmptyObject(data)
        ? { ...data }
        : {
            email: "",
            password: "",
            confirmPassword: "",
          },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: CredentialsData) => {
    updateData(values);
    checkEmail(values.email, {
      onSuccess: () => nextStep(),
      onError: () => {
        form.setError("email", {
          type: "manual",
          message: "E-mail já cadastrado.",
        });
      },
    });
  };
  return (
    <div>
      <CardDescription className="flex justify-center">
        Defina suas credenciais de acesso.
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu melhor email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite uma senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full cursor-pointer" type="submit">
              {isPending ? (
                <Spinner size={"small"} className="mr-2 text-white" />
              ) : (
                "Avançar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
