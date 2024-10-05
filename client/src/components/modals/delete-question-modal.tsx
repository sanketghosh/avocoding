// PACKAGES
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// LOCAL MODULES
import * as deleteQuestionAction from "@/actions/question-actions/delete-question-action";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ModalContentWrapper from "@/components/modals/modal-content-wrapper";
import { useQuestionStore } from "@/store/question-store";
import { encodeId } from "@/lib/url-encode-decode";

export default function DeleteQuestionModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { question } = useQuestionStore();
  //   console.log(question?.folderId);

  const encodedFolderId = encodeId(question ? question?.folderId : "");

  const mutation = useMutation({
    mutationFn: deleteQuestionAction.deleteQuestionAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate(`/folder/${encodedFolderId}`);
      await queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteQuestion = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(question?.id!);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="flex items-center gap-1"
        >
          <Trash2Icon size={20} />
          <p>Delete</p>
        </Button>
      </DialogTrigger>
      <ModalContentWrapper
        modalDescription="Deleting question will delete whole question which means title, description and most importantly the code too."
        modalTitle="Delete question"
      >
        <form onSubmit={handleDeleteQuestion}>
          <Button type="submit" disabled={false} variant={"destructive"}>
            {false ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Delete Question"
            )}
          </Button>
        </form>
      </ModalContentWrapper>
    </Dialog>
  );
}
