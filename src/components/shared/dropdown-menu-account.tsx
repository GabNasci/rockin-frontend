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

export function DropdownMenuAccount() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-primary h-14 w-14 p-0 cursor-pointer"
          >
            <CircleEllipsisIcon className="size-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>Editar perfil</DropdownMenuItem>
            <DropdownMenuItem disabled>Editar foto de perfil</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>Trocar perfil</DropdownMenuItem>
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
    </>
  );
}
