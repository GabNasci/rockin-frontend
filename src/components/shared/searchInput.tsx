"use client";
import { SearchIcon } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchInputProps extends React.ComponentProps<"input"> {
  onSearch?: () => void;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
}

export default function SearchInput({
  onSearch,
  className,
  buttonType = "button",
  ...props
}: SearchInputProps) {
  return (
    <div
      className={`border border-gray-300 rounded-full flex items-center px-1 py-1 shadow ${className}`}
    >
      <Input
        {...props}
        className="w-full border-0 focus-visible:ring-0 shadow-none pe-0"
        placeholder="Pesquisar"
      />
      <Button
        variant={"ghost"}
        type={buttonType}
        onClick={() => onSearch && onSearch()}
        className="px-2 py-2 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <SearchIcon className="scale-x-[-1]" size={24} />
      </Button>
    </div>
  );
}
