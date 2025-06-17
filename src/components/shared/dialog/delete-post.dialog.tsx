import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { PostResponse } from "@/models/posts/types";
import { useDeletePost } from "@/models/posts/usePosts";

export default function DeletePostDialog({
  open,
  setOpen,
  post,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  post: PostResponse;
}) {
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDelete = () => {
    deletePost(post.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir post</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDelete}>
            {isPending ? (
              <Spinner size={"small"} className="mr-2 text-white" />
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
