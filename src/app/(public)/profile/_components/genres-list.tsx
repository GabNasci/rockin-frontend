import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Genre } from "@/models/genres/types";

export function GenresList({ genres }: { genres: Genre[] }) {
  return (
    <Card className="flex flex-wrap gap-2 rounded-none shadow-none border-0">
      <CardHeader className="font-bold">Estilos:</CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {genres.length > 0 ? (
          genres.map((genre) => (
            <Badge
              key={genre.id}
              className="bg-primary text-white font-bold text-md rounded-full"
            >
              {genre.name}
            </Badge>
          ))
        ) : (
          <p className="text-gray-400 flex justify-center w-full">
            Sem estilos
          </p>
        )}
      </CardContent>
    </Card>
  );
}
