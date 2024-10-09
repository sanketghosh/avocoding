import * as executeCodeAction from "@/actions/code-execute/run-code";
import { Button } from "@/components/ui/button";
import { useCodeStore } from "@/store/code-store";
import { useExecutedOutputStore } from "@/store/executed-output-store";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, PlayIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function RunCode({ editorValue }: { editorValue?: string }) {
  const { programmingLanguage } = useCodeStore();
  // const [executedOutput, setExecutedOutput] = useState<string | undefined>(
  //   undefined,
  // );
  const { setExecutedOutput } = useExecutedOutputStore();

  // console.log("@@FROM RUN CODE", { editorValue, programmingLanguage });

  const { mutate, isPending } = useMutation({
    mutationFn: executeCodeAction.executeCodeAction,
    onSuccess: async (data) => {
      console.log(data);
      setExecutedOutput(data?.run?.output);
      // outputType(Object.keys(data?.run)[0]);
      // setExecutedOutput(Object.keys(data?.run)[0] || "No Output");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  // useEffect(() => {
  //   // console.log(programmingLanguage);
  //   // console.log(data?.run?.output);
  //   setExecutedOutput(data?.run?.output);
  // }, []);

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
      {isPending ? (
        <Loader2Icon className="animate-spin" size={20} />
      ) : (
        <PlayIcon size={20} />
      )}
      {isPending ? <p>Running...</p> : <p>Run code</p>}
    </Button>
  );
}
