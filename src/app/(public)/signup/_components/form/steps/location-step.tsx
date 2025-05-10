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
import {
  LocationData,
  locationSchema,
  ProfileData,
} from "@/schemas/CreateProfileSchema";
import { useMultiStepForm } from "@/lib/contexts/multi-step-form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LocationStep() {
  const { data, updateData } = useMultiStepForm<ProfileData>();

  const form = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (values: LocationData) => {
    updateData({ location: values });
    console.log(values);
  };

  return (
    <div>
      <CardDescription className="flex justify-center">
        Informe seu endereço. Para que possamos te indicar perfis mais próximos
        a você(Você pode informar apenas a cidade).
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Button className="w-full cursor-pointer" type="submit">
              Avançar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
