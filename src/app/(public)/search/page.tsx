import SearchInput from "@/components/shared/searchInput";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center mt-[56px]">
      <Tabs defaultValue="musicians" className="w-full">
        <Card className="w-full rounded-none shadow-none border-0 pb-0">
          <div className="px-4 flex flex-col gap-4">
            <SearchInput className="w-full" />
          </div>
          <TabsList className="flex justify-center w-full bg-white p-0">
            <TabsTrigger value="musicians">Músicos</TabsTrigger>
            <TabsTrigger value="establishment">Lugares</TabsTrigger>
          </TabsList>
        </Card>
        <TabsContent value="musicians" className="px-4 pt-2">
          <div>
            <h3 className="font-bold">Filtrar por especialidades:</h3>
          </div>
        </TabsContent>
        <TabsContent value="establishment" className="px-4 pt-2">
          <div>
            <h3 className="font-bold">Filtrar por tipos:</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
