import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";
import { Control, UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

export function CustomFileInput({
  name,
  control,
  form,
  handleFileChange,
}: {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const selected = Array.from(e.target.files || []);
                  form.setValue(name, selected);
                  handleFileChange(e);
                }}
                ref={inputRef}
                className="hidden"
              />
              <Button
                className="bg-transparent hover:bg-transparent hover:text-primary cursor-pointer text-gray-400 shadow-none "
                onClick={handleClick}
              >
                <ImageIcon />
                <span className="font-bold">Adicionar Imagem</span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
