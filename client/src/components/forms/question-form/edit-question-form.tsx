// PACKAGES
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

// LOCAL MODULES
import * as editQuestionAction from "@/actions/question-actions/edit-question-action";
import { FullQuestionSchema } from "@/schemas";
import { useQuestionStore } from "@/store/question-store";

// COMPONENTS
import MarkdownEditor from "@/components/markdown-editor";
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

export default function EditQuestionForm() {
  const { question, updateQuestion } = useQuestionStore();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FullQuestionSchema>>({
    resolver: zodResolver(FullQuestionSchema),
    defaultValues: {
      title: question?.title,
      problemStatement: question?.problemStatement,
    },
  });

  const mutation = useMutation({
    mutationFn: editQuestionAction.editQuestionAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      updateQuestion(form.getValues());
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEditQuestionSubmit = (
    values: z.infer<typeof FullQuestionSchema>,
  ) => {
    // console.log(values)
    mutation.mutate({
      formData: values,
      questionId: question?.id,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditQuestionSubmit)}
        className="space-y-4 py-4"
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
        <FormField
          control={form.control}
          name="problemStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Statement</FormLabel>
              <FormControl>
                <MarkdownEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
