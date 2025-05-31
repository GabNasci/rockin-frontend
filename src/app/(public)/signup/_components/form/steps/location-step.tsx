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
import { LocationAutocomplete } from "../locationAutocomplete";
import { useCreateProfile } from "@/models/profiles/useProfiles";
import { convertToNumbers } from "@/lib/utils";

export default function LocationStep() {
  const { data, updateData } = useMultiStepForm<ProfileData>();
  const { mutate } = useCreateProfile();

  const form = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (values: LocationData) => {
    updateData({ location: values });
    mutate({
      name: data.name,
      handle: data.handle,
      email: data.email,
      password: data.password,
      profileTypeId: Number(data.profileType),
      genres: convertToNumbers(data.genres),
      specialities: convertToNumbers(data.specialities),
      location: {
        ...values,
      },
    });
  };

  return (
    <div>
      <CardDescription className="flex justify-center text-center">
        Informe seu endereço. Para que possamos te indicar perfis mais próximos
        a você. (Você pode informar apenas a cidade.)
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="city"
              render={() => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <LocationAutocomplete />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="state"
              render={({ field }) => <input type="hidden" {...field} />}
            />
            <FormField
              control={control}
              name="country"
              render={({ field }) => <input type="hidden" {...field} />}
            />
            <FormField
              control={control}
              name="latitude"
              render={({ field }) => <input type="hidden" {...field} />}
            />
            <FormField
              control={control}
              name="longitude"
              render={({ field }) => <input type="hidden" {...field} />}
            />

            <Button className="w-full cursor-pointer" type="submit">
              Criar Conta
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
