// PACKAGES
import { QuestionTitleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as z from "zod";

// LOCAL MODULES
import * as createQuestionTitleAction from "@/actions/question-actions/create-question-title-action";
import { decodeId } from "@/lib/url-encode-decode";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AddQuestionTitleForm() {
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const decodedFolderId = decodeId(id!);
  // console.log(decodedFolderId);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof QuestionTitleSchema>>({
    resolver: zodResolver(QuestionTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createQuestionTitleAction.createQuestionTitleAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const handleCreateQuestion = (
    values: z.infer<typeof QuestionTitleSchema>,
  ) => {
    // console.log(values);
    mutation.mutate({
      formData: values,
      folderId: decodedFolderId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Find the second lowest from a given array."
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Create Question"
          )}
        </Button>
      </form>
    </Form>
  );
}
