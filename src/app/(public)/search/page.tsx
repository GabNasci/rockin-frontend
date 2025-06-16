"use client";
import SearchInput from "@/components/shared/searchInput";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterDialog from "./_components/filter.dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  defaultMusicianValues,
  defaultPlacesValues,
  searchProfileSchema,
  SearchProfilesData,
} from "@/schemas/SearchProfilesSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useSearchProfiles } from "@/models/profiles/useProfiles";
import ProfilesPaginationList from "./_components/profiles-pagination-list";
import { useSearchContext } from "@/lib/contexts/search.context";

export default function SearchPage() {
  const [tab, setTab] = useState<"musicians" | "establishments">("musicians");
  const { filters } = useSearchContext();
  const form = useForm<SearchProfilesData>({
    resolver: zodResolver(searchProfileSchema),
    defaultValues: {
      ...defaultMusicianValues,
    },
  });

  const { control, handleSubmit, reset } = form;

  const { mutate, data, isPending } = useSearchProfiles();

  useEffect(() => {
    mutate({
      search: form.getValues("search"),
      genres: form.getValues("genres"),
      specialities: form.getValues("specialities"),
      limit: form.getValues("limit"),
      page: form.getValues("page"),
      profileTypes: form.getValues("profileTypes"),
    });
  }, []);

  useEffect(() => {
    const search = filters.search ?? "";
    if (tab === "musicians") {
      reset({
        ...defaultMusicianValues,
        search,
      });
    } else {
      reset({
        ...defaultPlacesValues,
        search,
      });
    }
  }, [tab, reset]);

  const onChangeTab = (tab: "musicians" | "establishments") => {
    if (tab === "musicians") {
      reset(defaultMusicianValues);
    } else {
      reset(defaultPlacesValues);
    }
    mutate({
      search: form.getValues("search"),
      genres: form.getValues("genres"),
      specialities: form.getValues("specialities"),
      limit: form.getValues("limit"),
      page: form.getValues("page"),
      profileTypes: form.getValues("profileTypes"),
    });
    setTab(tab);
  };

  const onSubmit = (values: SearchProfilesData) => {
    mutate({
      search: values.search,
      genres: values.genres,
      specialities: values.specialities,
      limit: values.limit,
      page: values.page,
      profileTypes: values.profileTypes,
      radius: values.radius,
    });
  };

  return (
    <div className="mb-20">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex min-h-screen flex-col items-center mt-[56px]">
            <Tabs
              defaultValue="musicians"
              value={tab}
              onValueChange={(val) => onChangeTab(val as typeof tab)}
              className="w-full"
            >
              <Card className="w-full rounded-none shadow-none border-0 pb-0">
                <div className="px-4 flex flex-col gap-4">
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
                  />
                </div>
                <TabsList className="flex justify-center w-full bg-white p-0">
                  <TabsTrigger value="musicians">Músicos</TabsTrigger>
                  <TabsTrigger value="establishments">Lugares</TabsTrigger>
                </TabsList>
              </Card>
              <TabsContent value="musicians" className="pt-2">
                <div className="flex justify-between px-4">
                  <h3 className="font-bold flex items-end">Resultados:</h3>
                  <FilterDialog
                    tab="musicians"
                    defaultMusicianValues={defaultMusicianValues}
                    defaultPlacesValues={defaultPlacesValues}
                    form={form}
                    handleSubmit={handleSubmit(onSubmit)}
                  />
                </div>
                <div className="mt-4">
                  <ProfilesPaginationList
                    data={data}
                    isLoading={isPending}
                    onPageChange={(newPage) => {
                      form.setValue("page", newPage);
                      handleSubmit(onSubmit)();
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="establishments" className=" pt-2">
                <div className="flex justify-between px-4">
                  <h3 className="font-bold flex items-end">Resultados:</h3>
                  <FilterDialog
                    tab="establishments"
                    defaultMusicianValues={defaultMusicianValues}
                    defaultPlacesValues={defaultPlacesValues}
                    form={form}
                    handleSubmit={handleSubmit(onSubmit)}
                  />
                </div>
                <div className="mt-4">
                  <ProfilesPaginationList
                    data={data}
                    isLoading={isPending}
                    onPageChange={(newPage) => {
                      form.setValue("page", newPage);
                      handleSubmit(onSubmit)();
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
}
