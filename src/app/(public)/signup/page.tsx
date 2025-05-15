"use client";
import CreateAccountCard from "./_components/form/create-account-card";
import GenresAndSpecialitiesStep from "./_components/form/steps/genres_and_specialities-step";
import CredentialsStep from "./_components/form/steps/credentials-step";
import ProfileInfoStep from "./_components/form/steps/profile-info-step";
import FormLogo from "../../../components/shared/formLogo";
import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "@/lib/contexts/multi-step-form.context";
import LocationStep from "./_components/form/steps/location-step";

const steps = [
  <CredentialsStep key={"credentials"} />,
  <ProfileInfoStep key={"profile-info"} />,
  <GenresAndSpecialitiesStep key={"genres-and-specialities"} />,
  <LocationStep key={"location"} />,
];

function StepsRenderer({ steps }: { steps: React.ReactElement[] }) {
  const { currentStep } = useMultiStepForm();

  return steps[currentStep - 1];
}

export default function SignUp() {
  return (
    <MultiStepFormProvider steps={steps.length} initialData={{}}>
      <div className="flex min-h-screen flex-col items-center">
        <FormLogo />
        <CreateAccountCard>
          <StepsRenderer steps={steps} />
        </CreateAccountCard>
      </div>
    </MultiStepFormProvider>
  );
}
