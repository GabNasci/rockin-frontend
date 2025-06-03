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
import { DialogDescription } from "@radix-ui/react-dialog";
import { ProfileMentionCard } from "@/components/shared/profile-mention-card";
import { MAX_PROFILES } from "@/lib/constants";

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
  const [allProfiles, setAllProfiles] = useState<SimpleProfile[]>([]);
  const [selected, setSelected] = useState<SimpleProfile[]>(taggedProfiles);
  const [open, setOpen] = useState(false);

  const { mutate: searchFollowings } = useSearchFollowings();

  const fetchAllProfiles = () => {
    searchFollowings("", {
      onSuccess: (data) => {
        setAllProfiles(data);
        setResults(data); // mostra todos inicialmente
      },
    });
  };

  useEffect(() => {
    if (open) {
      fetchAllProfiles();
    }
  }, [open]);

  const handleAdd = (profile: SimpleProfile) => {
    if (selected.length >= MAX_PROFILES) return;
    if (!selected.find((p) => p.id === profile.id)) {
      setSelected((prev) => [...prev, profile]);
    }
  };

  const handleRemove = (id: number) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);
    const filtered = allProfiles.filter((profile) => {
      const search = value.toLowerCase();
      return (
        profile.name.toLowerCase().includes(search) ||
        profile.handle.toLowerCase().includes(search)
      );
    });
    setResults(filtered);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setProfiles(selected);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent hover:bg-transparent hover:text-primary cursor-pointer text-gray-400 shadow-none"
        >
          <PlusIcon size={16} />
          <span className="font-bold">Menções</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menções</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Selecione os perfis que deseja mencionar. (Você só pode mencionar
            perfis que está apoiando)
          </DialogDescription>
        </DialogHeader>

        <SearchInput
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 gap-y-2">
          {selected.map((p) => (
            <ProfileBadge key={p.id} profile={p} handleRemove={handleRemove} />
          ))}
        </div>

        {selected.length >= MAX_PROFILES && (
          <p className="text-sm text-red-500 mt-1">
            Você só pode mencionar até {MAX_PROFILES} perfis.
          </p>
        )}

        <div>
          <div className="flex w-full">
            <h2 className="font-bold text-gray-400">Resultados</h2>
          </div>
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              results.map((profile) => (
                <div key={profile.id}>
                  <div className="h-0.5 w-full bg-gray-300"></div>
                  <ProfileMentionCard
                    profile={profile}
                    className="py-6 cursor-pointer bg-transparent border-0 hover:bg-gray-200 rounded-none"
                    onAdd={handleAdd}
                    disabled={selected.length >= MAX_PROFILES}
                    selected={selected.some((p) => p.id === profile.id)}
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
