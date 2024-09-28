import * as updateFolderDetailsHandler from "@/actions/folder-actions/update-folder-details-action";
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
import { FolderSchema } from "@/schemas";
import { useFolderStore } from "@/store/folder-store";
import { CreatedFolderType } from "@/types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleOffIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type UpdateFolderFormProps = {
  folderData: CreatedFolderType;
  folderId: string;
};

export default function UpdateFolderForm({
  folderData,
  folderId,
}: UpdateFolderFormProps) {
  const queryClient = useQueryClient();
  const { updateFolder } = useFolderStore();

  const form = useForm<z.infer<typeof FolderSchema>>({
    defaultValues: {
      title: folderData.title,
      description: folderData.description,
      emoji: folderData.emoji,
    },
  });

  const mutation = useMutation({
    mutationFn: updateFolderDetailsHandler.updateFolderDetailsHandler,
    onSuccess: async (data) => {
      toast.success(data.message);
      updateFolder(folderId, form.getValues());
      await queryClient.invalidateQueries({
        queryKey: ["get-all-folder"],
      });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const handleUpdateFolder = (values: z.infer<typeof FolderSchema>) => {
    mutation.mutate({
      formData: values,
      folderId: folderId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateFolder)}>
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
                        disabled={mutation.isPending}
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
                  <Input
                    {...field}
                    placeholder="OOPs Practice"
                    disabled={mutation.isPending}
                    type="text"
                  />
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
                    disabled={mutation.isPending}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Create Folder"
          )}
        </Button>
      </form>
    </Form>
  );
}
