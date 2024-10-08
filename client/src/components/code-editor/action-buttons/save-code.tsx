// PACKAGES
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, SaveIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// LOCAL MODULES
import * as saveOrUpdateCodeAction from "@/actions/code-actions/save-or-update-code-action";
import { decodeId } from "@/lib/url-encode-decode";
import { useCodeStore } from "@/store/code-store";

// COMPONENTS
import { Button } from "@/components/ui/button";

type SaveCodeProps = {
  editorValue?: string;
  previousCode?: string;
};

export default function SaveCode({ editorValue, previousCode }: SaveCodeProps) {
  const { id } = useParams<{ id: string }>();
  const decodedQuestionId = decodeId(id!);
  const queryClient = useQueryClient();

  const {
    setCode,
    setEditorTheme,
    setProgrammingLanguage,
    code,
    editorTheme,
    programmingLanguage,
  } = useCodeStore();

  const mutation = useMutation({
    mutationFn: saveOrUpdateCodeAction.saveOrUpdateCodeAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      setCode(data?.data?.content);
      setEditorTheme(data?.data?.editorTheme);
      setProgrammingLanguage(data?.data?.language);
      console.log(data);
      await queryClient.invalidateQueries({
        queryKey: ["get-code"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveCode = (event: React.FormEvent) => {
    event.preventDefault();
    if (editorValue !== previousCode) {
      mutation.mutate({
        content: code!,
        editorTheme: editorTheme,
        language: programmingLanguage,
        questionId: decodedQuestionId,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSaveCode}>
        <Button
          size={"sm"}
          variant={"secondary"}
          disabled={mutation.isPending || editorValue === previousCode}
          className="flex items-center gap-1"
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" size={20} />
          ) : (
            <SaveIcon size={20} />
          )}
          {mutation.isPending ? <p>Saving...</p> : <p>Save</p>}
        </Button>
      </form>
    </>
  );
}
