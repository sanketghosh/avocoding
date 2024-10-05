// PACKAGES
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// LOCAL MODULES
import * as deleteFolderHandler from "@/actions/folder-actions/delete-folder-action";
import { decodeId } from "@/lib/url-encode-decode";
import { useFolderStore } from "@/store/folder-store";

// COMPONENTS
import ModalContentWrapper from "@/components/modals/modal-content-wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function DeleteFolderModal() {
  const { deleteFolder } = useFolderStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const decodedFolderId = decodeId(id!);

  const mutation = useMutation({
    mutationFn: deleteFolderHandler.deleteFolderHandler,
    onSuccess: async (data) => {
      toast.success(data.message);
      deleteFolder(decodedFolderId);
      navigate("/dashboard");
      await queryClient.invalidateQueries({ queryKey: ["get-all-folder"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteFolder = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(decodedFolderId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <ModalContentWrapper
        modalTitle="Delete Folder"
        modalDescription="Deleting the folder will also delete all the files related to it."
      >
        <form onSubmit={handleDeleteFolder}>
          <Button
            type="submit"
            disabled={mutation.isPending}
            variant={"destructive"}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Delete Folder"
            )}
          </Button>
        </form>
      </ModalContentWrapper>
    </Dialog>
  );
}
