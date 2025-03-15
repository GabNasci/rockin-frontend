"use client";

import { useMultiStepForm } from "@/hooks/multi-step-form";
import { CampaignFormContext } from "./multi-step-signup-form-config";
import MultiStepForm from "@/components/ui/extension/multi-step-form/multi-step-form";
import MultiStepNavButtons from "@/components/ui/extension/multi-step-form/multi-step-form-nav-buttons";
import MultiStepNavbar from "@/components/ui/extension/multi-step-form/multi-step-form-nav-bar";

const CampaignForm = () => {
  const { CurrentForm } = useMultiStepForm(CampaignFormContext);

  return (
    <MultiStepForm
      title="Campanha"
      description="Entre com as informações da Campanha"
    >
      <MultiStepNavbar context={CampaignFormContext} />
      <div className="flex flex-col flex-1 border p-2 min-w-fit">
        <div className="flex flex-col gap-2">
          <CurrentForm />
        </div>
        <MultiStepNavButtons
          context={CampaignFormContext}
          previousLabel="Anterior"
          nextLabel="Próximo"
          endStepLabel="Finalizar"
        />
      </div>
    </MultiStepForm>
  );
};

export default CampaignForm;
