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
  genresAndSpecialitiesSchema,
  GenresAndSpecialitiesData,
} from "@/schemas/CreateProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/shared/multi-select";

const OPTIONS: Option[] = [{ label: "Baterista", value: "1" }];

export default function GenresAndSpecialitiesStep() {
  const form = useForm<GenresAndSpecialitiesData>({
    resolver: zodResolver(genresAndSpecialitiesSchema),
    defaultValues: {
      genres: [],
      specialities: [],
    },
  });

  const onSubmit = (values: GenresAndSpecialitiesData) => {
    console.log(values);
  };
  return (
    <div>
      <CardDescription className="flex justify-center">
        Selecione as especialidades e gêneros musicais do seu perfil.
      </CardDescription>
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="genres"
              render={({ field }) => {
                const selectedOptions = OPTIONS.filter((opt) =>
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
                        defaultOptions={OPTIONS}
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
              control={form.control}
              name="specialities"
              render={({ field }) => {
                const selectedOptions = OPTIONS.filter((opt) =>
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
                        defaultOptions={OPTIONS}
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
            <Button className="w-full" type="submit">
              Avançar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
