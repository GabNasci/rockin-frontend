"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsisIcon } from "lucide-react";
import LogoutDialog from "./logout-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteProfileDialog } from "./dialog/delete-profile.dialog";
import { useAuth } from "@/lib/contexts/auth.context";
import { ProfileTypeID } from "@/lib/constants";

export function DropdownMenuAccount() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const userIsEstablishment =
    user?.profile_type_id !== ProfileTypeID.MUSICIAN &&
    user?.profile_type_id !== ProfileTypeID.BAND;
  if (!user) return null;

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-primary h-14 w-14 p-0 cursor-pointer"
          >
            <CircleEllipsisIcon className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/edit/profile")}>
              Editar perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/edit/avatar")}>
              Editar foto de perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/edit/location")}>
              Editar localização
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {!userIsEstablishment && (
              <DropdownMenuItem onClick={() => router.push("/change/profile")}>
                Trocar perfil
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                setOpenDeleteProfile(true);
                setOpenDropdown(false);
              }}
            >
              Excluir perfil
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenLogout(true);
              setOpenDropdown(false);
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={openLogout} onOpenChange={setOpenLogout} />
      <DeleteProfileDialog
        open={openDeleteProfile}
        setOpen={setOpenDeleteProfile}
        profile={user}
      />
    </>
  );
}
