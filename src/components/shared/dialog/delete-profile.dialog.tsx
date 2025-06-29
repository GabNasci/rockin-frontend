"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfileResponse } from "@/models/auth/types";
import { useDeleteProfile } from "@/models/profiles/useProfiles";
import { Spinner } from "@/components/ui/spinner";

export function DeleteProfileDialog({
  open,
  setOpen,
  profile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  profile: ProfileResponse | null;
}) {
  const { mutate: deleteProfile, isPending, isSuccess } = useDeleteProfile();

  const handleDeleteProfile = () => {
    if (!profile) return;
    deleteProfile(profile.id);
    if (!isPending && isSuccess) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir seu perfil?</DialogTitle>
          <DialogDescription>
            Esta ação é{" "}
            <span className="font-semibold text-destructive">irreversível</span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 text-gray-600 text-sm">
          <p>
            Ao excluir seu perfil, todas as informações associadas serão
            <span className="font-semibold"> permanentemente deletadas</span>,
            incluindo:
          </p>

          <ul className="ml-4 list-disc space-y-1">
            <li>Seus posts e todas as mídias publicadas</li>
            <li>Suas imagens e arquivos enviados</li>
            <li>Suas conversas e mensagens</li>
            <li>Suas conexões (seguidores e seguindo)</li>
            <li>Seus gêneros, especialidades e localizações cadastradas</li>
            <li>
              {`Se você for dono de alguma banda, ela também será excluída`}
            </li>
            <li>
              {`Se este perfil for de uma banda, a própria banda e seus registros serão excluídos`}
            </li>
          </ul>

          <p>
            Essa ação{" "}
            <span className="font-semibold text-destructive">
              não poderá ser desfeita
            </span>
            .
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDeleteProfile}>
            {isPending ? (
              <Spinner size={"small"} className="mr-2 text-white" />
            ) : (
              "Excluir perfil permanentemente"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
