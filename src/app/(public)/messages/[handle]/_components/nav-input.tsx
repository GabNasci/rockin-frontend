import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavigationIcon } from "lucide-react";

interface NavInputProps extends React.ComponentProps<"input"> {
  placeholder?: string;
}

export function NavInput({
  placeholder = "Escreva uma mensagem",
  ...props
}: NavInputProps) {
  return (
    <Card className="fixed flex flex-row bottom-0 rounded-none border-x-0 left-0 p-4 w-full items-center gap-2">
      <Input {...props} type="text" placeholder={placeholder} />
      <Button type="submit" className="cursor-pointer">
        <NavigationIcon className="textwhite" fill="white" />
      </Button>
    </Card>
  );
}
