import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CreateAccountCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="w-[350px] px-4">
      <CardHeader className="flex justify-center">
        <CardTitle>Crie sua conta</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
