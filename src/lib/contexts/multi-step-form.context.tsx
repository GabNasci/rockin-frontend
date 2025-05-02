// context/MultiStepFormContext.tsx
import { createContext, useContext, ReactNode, useState } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

type MultiStepFormContextType<T extends FieldValues> = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  formMethods: UseFormReturn<T>;
};

const MultiStepFormContext =
  createContext<MultiStepFormContextType<any> | null>(null);

export function useMultiStepForm<T extends FieldValues>() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within MultiStepFormProvider",
    );
  }
  return context as MultiStepFormContextType<T>;
}

type ProviderProps<T extends FieldValues> = {
  children: ReactNode;
  form: UseFormReturn<T>; // <- recebe formMethods de fora
  steps: number;
};

export function MultiStepFormProvider<T extends FieldValues>({
  children,
  form,
  steps,
}: ProviderProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () =>
    setCurrentStep((prev) => (prev < steps ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  const setStep = (step: number) => {
    if (step >= 1 && step <= steps) setCurrentStep(step);
  };

  return (
    <MultiStepFormContext.Provider
      value={{
        currentStep,
        totalSteps: steps,
        nextStep,
        prevStep,
        setStep,
        formMethods: form,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
}
