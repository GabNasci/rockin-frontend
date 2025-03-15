import type {
  Form,
  UseMultiStepFormTypeOptions,
} from "@/types/multi-step-form";
import type { SubmitHandler } from "react-hook-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

import buildMultiStepForm from "@/lib/multi-step-form";
import { CampaignFormSchema, CampaignFormType } from "@/schemas/testSchema";

//  3 - Initial Data for fields
export const initialFormData: CampaignFormType = {
  name: "",
  owner: "",
  url: "",
};

//  4 - Define the final end step submit function
const saveFormData: SubmitHandler<CampaignFormType> = async (values) => {
  console.log("Your custom save function");
  console.log(values);
};

//  5 - Define the steps and sub-forms and each field for step
export const forms: Form<CampaignFormType>[] = [
  { id: 1, label: "Campanha", form: Step1, fields: ["name"] },
  { id: 2, label: "Administrador", form: Step2, fields: ["owner"] },
  { id: 3, label: "Página", form: Step3, fields: ["url"] },
];

//  6 - Define initial Form Options
const initialFormOptions: UseMultiStepFormTypeOptions<CampaignFormType> = {
  schema: CampaignFormSchema,
  currentStep: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentStep: (value) => {},
  forms,
  saveFormData,
};

// 7 - Build the Context and Provider
export const {
  FormContext: CampaignFormContext,
  FormProvider: CampaignProvider,
} = buildMultiStepForm(initialFormOptions, CampaignFormSchema, initialFormData);
