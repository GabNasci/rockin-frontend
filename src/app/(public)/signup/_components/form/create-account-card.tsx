import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMultiStepForm } from "@/lib/contexts/multi-step-form.context";
import { ArrowLeftIcon } from "lucide-react";

export default function CreateAccountCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentStep, prevStep } = useMultiStepForm();

  return (
    <Card className="w-[350px] px-4">
      <CardHeader className="flex justify-center relative">
        {currentStep > 1 && (
          <ArrowLeftIcon
            onClick={prevStep}
            className="cursor-pointer text-gray-400 absolute left-0"
          />
        )}
        <CardTitle>Crie sua conta</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
