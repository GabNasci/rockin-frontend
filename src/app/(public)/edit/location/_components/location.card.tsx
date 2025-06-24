import { Card, CardContent } from "@/components/ui/card";
import { LocationData } from "@/schemas/CreateProfileSchema";

export function LocationCard({ location }: { location: LocationData }) {
  return (
    <Card className="p-4">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-wrap gap-2">
          <p className="font-bold text-sm">Cidade:</p>
          <p className="text-sm">
            {location?.city || "Nenhuma cidade cadastrada"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="font-bold text-sm">Estado:</p>
          <p className="text-sm">
            {location?.state || "Nenhum estado cadastrado"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="font-bold text-sm">País:</p>
          <p className="text-sm">
            {location?.country || "Nenhum país cadastrado"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
