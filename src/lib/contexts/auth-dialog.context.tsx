"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthDialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
  undefined,
);

export const AuthDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <AuthDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog precisa estar dentro do AuthDialogProvider");
  }
  return context;
};
