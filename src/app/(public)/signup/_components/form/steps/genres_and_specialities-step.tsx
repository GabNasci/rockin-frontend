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
  GenresAndSpecialitiesData,
  genresAndSpecialitiesSchema,
  ProfileData,
} from "@/schemas/CreateProfileSchema";
import MultipleSelector from "@/components/shared/multi-select";
import { useMultiStepForm } from "@/lib/contexts/multi-step-form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSpecialitiesByProfileType } from "@/models/specialities/useSpecialities";
import { useGenres } from "@/models/genres/useSpecialities";
import { Spinner } from "@/components/ui/spinner";
import { mapToOptions } from "@/lib/utils";

export default function GenresAndSpecialitiesStep() {
  const { data, updateData, nextStep } = useMultiStepForm<ProfileData>();
  const { data: specialitiesData } = useSpecialitiesByProfileType(
    Number(data.profileType),
  );
  console.log(specialitiesData);
  const { data: genresData } = useGenres();

  const form = useForm<GenresAndSpecialitiesData>({
    resolver: zodResolver(genresAndSpecialitiesSchema),
    defaultValues: {
      genres: [],
      specialities: [],
    },
  });

  const { handleSubmit, control } = form;

  if (!specialitiesData || !genresData)
    return <Spinner size={"medium"} className="text-primary" />;

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

  const onSubmit = (values: GenresAndSpecialitiesData) => {
    updateData(values);
    console.log(values);
    nextStep();
  };

  return (
    <div>
      <CardDescription className="flex justify-center">
        Selecione as especialidades e gêneros musicais do seu perfil.
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="w-full cursor-pointer" type="submit">
              Avançar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
