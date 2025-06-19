import SearchInput from "@/components/shared/searchInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SimpleProfile } from "@/models/profiles/types";
import { useSearchFollowings } from "@/models/profiles/useProfiles";
import { useEffect, useState } from "react";
import ProfileBadge from "@/components/shared/profileBadge";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ProfileMentionCard } from "@/components/shared/profile-mention-card";
import { MAX_PROFILES } from "@/lib/constants";
import {
  useAddMemberToBand,
  useGetBandByProfileId,
} from "@/models/bands/useBands";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/contexts/auth.context";
import { toast } from "@/lib/toast";

type AddMembersDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  members: SimpleProfile[];
};

export function AddMembersDialog({
  open,
  setOpen,
  members,
}: AddMembersDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SimpleProfile[]>([]);
  const [allProfiles, setAllProfiles] = useState<SimpleProfile[]>([]);
  const [selected, setSelected] = useState<SimpleProfile[]>([]);
  const { mutate: addMembers, isPending } = useAddMemberToBand();
  const { user } = useAuth();
  const { data: band, isLoading: isLoadingBand } = useGetBandByProfileId(
    user?.id,
    !!user?.id,
  );
  const { mutate: searchFollowings, isPending: isLoadingFollowings } =
    useSearchFollowings();

  useEffect(() => {
    if (members) {
      setSelected(members);
    }
  }, [members]);

  const fetchAllProfiles = () => {
    searchFollowings("", {
      onSuccess: (data) => {
        setAllProfiles(data);
        setResults(data);
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
    if (id === user?.id) return;
    if (id === band?.owner_id) {
      toast.error("Você não pode remover o proprietário da banda dos membros.");
      return;
    }
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

  const handleAddMembers = () => {
    addMembers(
      selected.map((p) => p.id),
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menções</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Selecione os perfis que deseja adiconar como membros. (Você só pode
            mencionar perfis que está apoiando)
          </DialogDescription>
        </DialogHeader>
        {isLoadingFollowings && isLoadingBand ? (
          <div className="flex justify-center items-center h-24">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <SearchInput
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 gap-y-2">
              {selected?.map((p) => (
                <ProfileBadge
                  key={p.id}
                  profile={p}
                  handleRemove={handleRemove}
                />
              ))}
            </div>

            {selected?.length >= MAX_PROFILES && (
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
          </div>
        )}

        <DialogFooter className="flex flex-row justify-end w-full">
          <Button
            className="w-fit flex cursor-pointer"
            disabled={isPending}
            onClick={handleAddMembers}
          >
            {isPending ? (
              <Spinner size={"small"} className="mr-2 text-white" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
