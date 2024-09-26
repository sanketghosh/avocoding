// packages
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// local modules
import { AddFolderSchema } from "@/schemas";

// components
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddFolderForm() {
  const form = useForm<z.infer<typeof AddFolderSchema>>({
    resolver: zodResolver(AddFolderSchema),
    defaultValues: {
      title: "",
      description: "",
      emoji: "",
    },
  });

  const handleCreateForm = (values: z.infer<typeof AddFolderSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateForm)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emoji</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className="h-32 w-full"
                      >
                        {form.watch("emoji") ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl" role="img">
                              {field.value}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <CircleOffIcon className="h-[48px] w-[48px]" />
                            <p className="text-xs text-muted-foreground">
                              Click to select
                            </p>
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji: { native: string }) => {
                          field.onChange(emoji.native);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="OOPs Practice" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="For practicing OOPs related problem in the easiest way possible."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-4 w-full" type="submit">
          Create Folder
        </Button>
      </form>
    </Form>
  );
}
