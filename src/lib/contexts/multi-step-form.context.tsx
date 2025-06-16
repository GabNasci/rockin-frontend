"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type MultiStepFormContextType<T> = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  updateData: (data: Partial<T>) => void;
  data: T;
};
const MultiStepFormContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<MultiStepFormContextType<any> | null>(null);

export function useMultiStepForm<T>() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within MultiStepFormProvider",
    );
  }
  return context as MultiStepFormContextType<T>;
}

type ProviderProps<T> = {
  children: ReactNode;
  steps: number;
  initialData: T;
};

export function MultiStepFormProvider<T>({
  children,
  steps,
}: ProviderProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<T>({} as T);

  const nextStep = () =>
    setCurrentStep((prev) => (prev < steps ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  const setStep = (step: number) => {
    if (step >= 1 && step <= steps) setCurrentStep(step);
  };

  const updateData = (newData: Partial<T>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <MultiStepFormContext.Provider
      value={{
        currentStep,
        totalSteps: steps,
        nextStep,
        prevStep,
        setStep,
        updateData,
        data,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
}
