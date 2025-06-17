import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsisIcon } from "lucide-react";
import { useState } from "react";
import DeletePostDialog from "./dialog/delete-post.dialog";
import { PostResponse } from "@/models/posts/types";

export function DropdownMenuPost({ post }: { post: PostResponse }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-primary h-14 w-14 p-0 cursor-pointer"
          >
            <CircleEllipsisIcon className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Post</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setOpenPost(true);
                setOpenDropdown(false);
              }}
            >
              Excluir post
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog open={openPost} setOpen={setOpenPost} post={post} />
    </>
  );
}
