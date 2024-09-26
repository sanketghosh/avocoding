// LOCAL MODULES
import { AddQuestionSchema } from "@/schemas";

// PACKAGES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export default function AddQuestionForm() {
  const form = useForm<z.infer<typeof AddQuestionSchema>>({
    resolver: zodResolver(AddQuestionSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleCreateQuestion = (values: z.infer<typeof AddQuestionSchema>) => {
    console.log(values);
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
        <Button className="w-full">Create Question</Button>
      </form>
    </Form>
  );
}
