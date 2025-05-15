import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-[350px] px-4">
      <CardHeader className="flex justify-center ">
        <CardTitle>Fazer Login</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
