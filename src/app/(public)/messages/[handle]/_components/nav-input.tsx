import { AutosizeTextarea } from "@/components/shared/auto-resize-text-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavigationIcon } from "lucide-react";

interface NavInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
}

export function NavInput({
  placeholder = "Escreva uma mensagem",
  ...props
}: NavInputProps) {
  return (
    <Card className="fixed flex flex-row bottom-0 rounded-none border-x-0 left-0 p-4 w-full items-end gap-2">
      <AutosizeTextarea
        className="resize-none "
        placeholder={placeholder}
        {...props}
      />
      <Button type="submit" className="cursor-pointer">
        <NavigationIcon className="textwhite" fill="white" />
      </Button>
    </Card>
  );
}
