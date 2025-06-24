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
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LocationAutocomplete } from "../../signup/_components/form/locationAutocomplete";
import { LocationData, locationSchema } from "@/schemas/CreateProfileSchema";
import { useAuth } from "@/lib/contexts/auth.context";
import { LocationCard } from "./_components/location.card";
import { useEditLocation } from "@/models/profiles/useProfiles";
import { Spinner } from "@/components/ui/spinner";

export default function EditLocationPage() {
  useProtectedRoute();
  const { user } = useAuth();
  const currentLocation: LocationData | undefined = user?.locations;
  const { mutate: editLocation, isPending } = useEditLocation();
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

  const { handleSubmit, control, reset, watch } = form;

  const watchedLocation = watch();

  useEffect(() => {
    if (currentLocation) {
      reset({
        city: currentLocation.city || "",
        state: currentLocation.state || "",
        country: currentLocation.country || "",
        latitude: currentLocation.latitude?.toString() || "",
        longitude: currentLocation.longitude?.toString() || "",
      });
    }
  }, [currentLocation, reset]);

  const onSubmit = (values: LocationData) => {
    editLocation(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px] pt-20 px-4">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Editar localização</CardTitle>
              <CardDescription>Edite sua localização.</CardDescription>
              {currentLocation && <LocationCard location={watchedLocation} />}
            </CardHeader>

            <CardContent className="space-y-4">
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
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={isPending} className="w-full">
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
