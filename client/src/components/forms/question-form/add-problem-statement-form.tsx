import * as createQuestionProblemStatementAction from "@/actions/question-actions/create-question-problem-statement-action";
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
import { QuestionProblemStatementSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function AddProblemStatementForm() {
  // const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof QuestionProblemStatementSchema>>({
    resolver: zodResolver(QuestionProblemStatementSchema),
    defaultValues: {
      problemStatement: "",
    },
  });

  const mutation = useMutation({
    mutationFn:
      createQuestionProblemStatementAction.createQuestionProblemStatementAction,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const problemStatementSubmitHandler = (
    values: z.infer<typeof QuestionProblemStatementSchema>,
  ) => {
    mutation.mutate({
      formData: values,
      questionId: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(problemStatementSubmitHandler)}
        className="space-y-4 py-4"
      >
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
