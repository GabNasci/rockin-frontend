import { Button } from "@/components/ui/button";
import MultiStepCampaign from "./_components/multi-step-signup-form";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="">Sign Up Page</h1>
      <Button>Click me</Button>
      <MultiStepCampaign />
    </div>
  );
}
