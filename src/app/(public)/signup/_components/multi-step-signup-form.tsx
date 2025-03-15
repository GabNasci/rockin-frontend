"use client";

import { CampaignProvider } from "./multi-step-signup-form-config";
import CampaignForm from "./signup-form";

const MultiStepCampaign = () => {
  return (
    <CampaignProvider>
      <CampaignForm />
    </CampaignProvider>
  );
};

export default MultiStepCampaign;
