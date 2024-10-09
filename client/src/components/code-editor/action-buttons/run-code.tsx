import * as executeCodeAction from "@/actions/code-execute/run-code";
import { Button } from "@/components/ui/button";
import { useCodeStore } from "@/store/code-store";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function RunCode({ editorValue }: { editorValue?: string }) {
  const { programmingLanguage } = useCodeStore();
  const [executedOutput, setExecutedOutput] = useState<string | undefined>(
    undefined,
  );

  // console.log("@@FROM RUN CODE", { editorValue, programmingLanguage });

  const { data, mutate } = useMutation({
    mutationFn: executeCodeAction.executeCodeAction,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    // console.log(programmingLanguage);
    // console.log(data?.run?.output);
    setExecutedOutput(data?.run.output);
  }, []);

  const handleRunCode = () => {
    mutate({
      code: editorValue!,
      language: programmingLanguage.toLowerCase(),
      version: "1.32.3",
    });
  };

  return (
    <Button
      size={"sm"}
      className="flex items-center gap-1 bg-green-800/20 text-green-500 hover:bg-green-800/30"
      variant={"secondary"}
      onClick={handleRunCode}
    >
      <PlayIcon size={20} />
      <p>Run Code</p>
    </Button>
  );
}
