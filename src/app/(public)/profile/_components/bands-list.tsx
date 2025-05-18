import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Band } from "@/models/bands/types";

type BandsListProps = {
  bands: Band[];
};

export function BandsList({ bands }: BandsListProps) {
  return (
    <Card className="flex w-full gap-2 border-0 rounded-none shadow-none">
      <CardHeader className="font-bold">Bandas:</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {bands?.length > 0 ? (
          bands?.map((band) => (
            <ProfileHorizontalCard key={band.id} profile={band.profile} />
          ))
        ) : (
          <p className="text-gray-400 flex justify-center w-full">Sem bandas</p>
        )}
      </CardContent>
    </Card>
  );
}
