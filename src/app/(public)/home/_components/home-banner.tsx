"use client";
import SearchInput from "@/components/shared/searchInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSearchContext } from "@/lib/contexts/search.context";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function HomeBanner() {
  const { filters, updateFilters } = useSearchContext();
  const router = useRouter();

  const form = useForm<SearchProfilesData>({
    defaultValues: {
      ...filters,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: SearchProfilesData) => {
    updateFilters(values);
    router.push(`/search`);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full px-8 md:px-40">
      <div className="flex flex-col items-center gap-1 font-bold">
        <h3>O que você procura?</h3>
        <h3>Músicos, bandas ou lugares...</h3>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SearchInput
                    buttonType="submit"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </form>
      </Form>
    </div>
  );
}
