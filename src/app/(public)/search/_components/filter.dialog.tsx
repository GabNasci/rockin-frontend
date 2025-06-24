import MultipleSelector from "@/components/shared/multi-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Slider } from "@/components/ui/slider";
import { ProfileTypeID } from "@/lib/constants";
import { useAuth } from "@/lib/contexts/auth.context";
import { mapToOptions } from "@/lib/utils";
import { useGenres } from "@/models/genres/useGenres";
import { useSpecialitiesByProfileType } from "@/models/specialities/useSpecialities";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SlidersHorizontalIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type FilterDialogProps = {
  tab: "musicians" | "establishments";
  form: UseFormReturn<SearchProfilesData>;
  handleSubmit: () => void;
  defaultMusicianValues: SearchProfilesData;
  defaultPlacesValues: SearchProfilesData;
};

export default function FilterDialog({
  tab,
  form,
  handleSubmit,
  defaultMusicianValues,
  defaultPlacesValues,
}: FilterDialogProps) {
  const { control, reset, watch, setValue } = form;

  const { isLoggedIn } = useAuth();

  const searchByRadius = watch("searchByRadius");

  const { data: genresData } = useGenres();
  const { data: specialitiesData } = useSpecialitiesByProfileType(
    tab === "musicians" ? ProfileTypeID.MUSICIAN : ProfileTypeID.ESTABLISHMENT,
  );

  const genresOptions = mapToOptions(
    genresData,
    (g) => g.name,
    (g) => g.name,
  );

  const specialitiesOptions = mapToOptions(
    specialitiesData,
    (s) => s.name,
    (s) => s.name,
  );

  const resetForm = () => {
    if (tab === "musicians") {
      reset(defaultMusicianValues);
    } else {
      reset(defaultPlacesValues);
    }
  };

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
        <div className="flex flex-col gap-4 mb-8">
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
          {isLoggedIn && (
            <FormField
              control={control}
              name="searchByRadius"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel>Buscar por raio?</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="cursor-pointer"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) {
                          setValue("radius", undefined);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {searchByRadius && isLoggedIn && (
            <FormField
              control={control}
              name="radius"
              render={({ field }) => (
                <FormItem>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    {field.value ?? 33} km
                  </div>
                  <FormControl>
                    <Slider
                      defaultValue={field.value ? [field.value] : [33]}
                      value={field.value ? [field.value] : [33]}
                      onValueChange={(val) => field.onChange(val[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => resetForm()}
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
