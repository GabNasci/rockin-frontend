"use client";
import SearchInput from "@/components/shared/searchInput";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterDialog from "./_components/filter.dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
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

const defaultMusicianValues: SearchProfilesData = {
  search: "",
  genres: [],
  specialities: [],
  limit: 20,
  page: 1,
  profileType: ["Músico(a)", "Banda"],
  includeBands: true,
};

const defaultPlacesValues: SearchProfilesData = {
  search: "",
  genres: [],
  specialities: [],
  limit: 20,
  page: 1,
  profileType: ["Estabelecimento"],
  includeBands: false,
};

export default function Home() {
  const [tab, setTab] = useState<"musicians" | "establishments">("musicians");

  const form = useForm<SearchProfilesData>({
    resolver: zodResolver(searchProfileSchema),
    defaultValues: {
      ...defaultMusicianValues,
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (tab === "musicians") {
      reset(defaultMusicianValues);
    } else {
      reset(defaultPlacesValues);
    }
  }, [tab, reset]);

  const onSubmit = (values: SearchProfilesData) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex min-h-screen flex-col items-center mt-[56px]">
            <Tabs
              defaultValue="musicians"
              value={tab}
              onValueChange={(val) => setTab(val as typeof tab)}
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
              <TabsContent value="musicians" className="px-4 pt-2">
                <div className="flex justify-between">
                  <h3 className="font-bold">Sugestões:</h3>
                  <FilterDialog
                    form={form}
                    handleSubmit={handleSubmit(onSubmit)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="establishments" className="px-4 pt-2">
                <div>
                  <h3 className="font-bold">Sugestões:</h3>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
}
