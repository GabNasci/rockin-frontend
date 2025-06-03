import MultipleSelector from "@/components/shared/multi-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mapToOptions } from "@/lib/utils";
import { useGenres } from "@/models/genres/useGenres";
import { useSpecialitiesByProfileType } from "@/models/specialities/useSpecialities";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SlidersHorizontalIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type FilterDialogProps = {
  form: UseFormReturn<SearchProfilesData>;
  handleSubmit: () => void;
};

export default function FilterDialog({
  form,
  handleSubmit,
}: FilterDialogProps) {
  const { control } = form;

  const { data: genresData } = useGenres();
  const { data: specialitiesData } = useSpecialitiesByProfileType(1);

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white text-primary cursor-pointer"
        >
          <SlidersHorizontalIcon className="text-black" />
          Filtro Avançado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtro Avançado:</DialogTitle>
          <DialogDescription>
            Defina os filtros para buscar os perfis.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Busca:</FormLabel>
                <FormControl>
                  <Input placeholder="Procure por nome..." {...field} />
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
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => form.reset()}
            type="reset"
          >
            Limpar
          </Button>
          <DialogClose asChild>
            <Button
              className="cursor-pointer"
              onClick={() => handleSubmit()}
              type="submit"
            >
              Buscar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
