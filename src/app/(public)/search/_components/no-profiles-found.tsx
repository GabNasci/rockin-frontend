import { SearchX } from "lucide-react";

export default function NoProfilesFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-muted-foreground">
      <SearchX className="w-12 h-12 mb-4 text-primary" />
      <h2 className="text-xl font-semibold">Nenhum perfil encontrado</h2>
      <p className="mt-2 text-sm">
        Tente ajustar os filtros ou usar termos diferentes na busca.
      </p>
    </div>
  );
}
