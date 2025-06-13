"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthDialog } from "@/lib/contexts/auth-dialog.context";
import { useRouter } from "next/navigation";

export function AuthDialog() {
  const { isOpen, closeDialog } = useAuthDialog();
  const router = useRouter();

  const handleLogin = () => {
    closeDialog();
    router.push("/login");
  };

  const handleRegister = () => {
    closeDialog();
    router.push("/register");
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faça login ou crie uma conta</DialogTitle>
        </DialogHeader>
        <p className="text-sm">
          Você precisa estar logado para realizar essa ação.
        </p>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleRegister}>
            Criar conta
          </Button>
          <Button onClick={handleLogin}>Entrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
