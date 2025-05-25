import SearchInput from "@/components/shared/searchInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SimpleProfile } from "@/models/profiles/types";
import { useSearchFollowings } from "@/models/profiles/useProfiles";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileBadge from "@/components/shared/profileBadge";
import { ProfileHorizontalCard } from "@/components/shared/profile-horizontal-card";
import { DialogDescription } from "@radix-ui/react-dialog";

type AddProfileDialogProps = {
  taggedProfiles: SimpleProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<SimpleProfile[]>>;
};

export function AddProfileDialog({
  taggedProfiles,
  setProfiles,
}: AddProfileDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SimpleProfile[]>([]);
  const [selected, setSelected] = useState<SimpleProfile[]>(taggedProfiles);
  const [open, setOpen] = useState(false);

  const { mutate: searchFollowings } = useSearchFollowings();

  const fetchProfiles = (search: string) => {
    searchFollowings(search, {
      onSuccess: (data) => {
        setResults(data);
      },
    });
  };

  useEffect(() => {
    if (open) {
      fetchProfiles("");
    }
  }, [open]);

  const handleAdd = (profile: SimpleProfile) => {
    if (!selected.find((p) => p.id === profile.id)) {
      setSelected((prev) => [...prev, profile]);
    }
  };

  const handleRemove = (id: number) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent hover:bg-transparent hover:text-primary cursor-pointer text-gray-400 shadow-none "
        >
          <PlusIcon size={16} />
          <span className="font-bold">Menções</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menções</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Selecione os perfis que deseja mencionar.(Você só pode mencionar
            perfis que esta apoiando)
          </DialogDescription>
        </DialogHeader>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={() => fetchProfiles(query)}
        />
        <div className="flex flex-wrap gap-2">
          {selected.map((p) => (
            <ProfileBadge key={p.id} profile={p} handleRemove={handleRemove} />
          ))}
        </div>
        <div>
          <div className="flex w-full">
            <h2 className="font-bold text-gray-400">Resultados</h2>
          </div>
          <div className=" flex flex-col gap-2 max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              results.map((profile) => (
                <div key={profile.id}>
                  <div className="h-0.5 w-full bg-gray-300"></div>
                  <ProfileHorizontalCard
                    profile={profile}
                    className="py-6 cursor-pointer bg-transparent border-0 hover:bg-gray-200 rounded-none"
                    onAdd={handleAdd}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 flex justify-center w-full">
                Não há resultados
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end w-full">
          <Button
            className="w-fit flex cursor-pointer"
            onClick={() => {
              setProfiles(selected);
              setOpen(false);
            }}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
