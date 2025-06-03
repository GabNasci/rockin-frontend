"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type FormContextType<T> = {
  data: T;
  updateData: (data: Partial<T>) => void;
  setData: (data: T) => void;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<FormContextType<any> | null>(null);

export function useFormContext<T>() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context as FormContextType<T>;
}

type FormProviderProps<T> = {
  children: ReactNode;
  initialData: T;
};

export function FormProvider<T>({
  children,
  initialData,
}: FormProviderProps<T>) {
  const [data, setData] = useState<T>(initialData);

  const updateData = (newData: Partial<T>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <FormContext.Provider value={{ data, updateData, setData }}>
      {children}
    </FormContext.Provider>
  );
}
