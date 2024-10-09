// PACKAGES
import Editor, { Monaco } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// LOCAL MODULES
import { decodeId } from "@/lib/url-encode-decode";
import { cn } from "@/lib/utils";
import { useCodeStore } from "@/store/code-store";
import { useSidePanelStore } from "@/store/side-panel-store";

// COMPONENTS
import * as getCodeAction from "@/actions/code-actions/get-code-action";
import ActionButtonsBar from "@/components/code-editor/action-buttons-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useExecutedOutputStore } from "@/store/executed-output-store";

export function EditorPanel() {
  const { executedOutput } = useExecutedOutputStore();

  const options = {
    fontSize: 18,
    fontWeight: "550",
    fontLigatures: true,
    fontFamily: "JetBrains Mono",
    automaticLayout: true,
  };

  const {
    editorTheme,
    boilerplate,
    programmingLanguage,
    setCode,
    setEditorTheme,
    setProgrammingLanguage,
    // code,
    isEditing,
    startEditing,
  } = useCodeStore();
  const { isOpen } = useSidePanelStore();
  const { id } = useParams<{ id: string }>();
  const decodedQuestionId = decodeId(id!);

  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);
  const [previousCode, setPreviousCode] = useState<string | undefined>(
    undefined,
  );
  // const editorValueRef = useRef<string | undefined>(undefined);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      allowNonTsExtensions: true,
      lib: ["es2018"],
    });
  };

  // const handleEditorChange = useCallback(
  //   debounce((value: string | undefined) => {
  //     if (value !== undefined) {
  //       setEditorValue(value);
  //       setCode(value);
  //       // editorValueRef.current = value;
  //     }
  //   }, 5000),
  //   [setCode],
  // );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
      setCode(value);
    }
  };

  const handleEditorDidMount = () => {
    startEditing();
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["get-code", decodedQuestionId],
    queryFn: () =>
      getCodeAction.getCodeAction({ questionId: decodedQuestionId }),
    staleTime: 0,
    enabled: !!decodedQuestionId,
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log(data?.data);

      if (!isEditing) {
        setEditorValue(data?.data?.content);
      }
      setEditorTheme(data?.data?.editorTheme);
      setProgrammingLanguage(data?.data?.language);
      setPreviousCode(data?.data?.content);
    }
  }, [
    isSuccess,
    data,
    setEditorTheme,
    setProgrammingLanguage,
    setEditorValue,
    isEditing,
  ]);

  // const baseEditorVal = isEditing ? code : boilerplate;
  // const editorValue = isEditing ? data?.data?.content : boilerplate;

  useEffect(() => {
    setEditorValue(boilerplate);
  }, [boilerplate]);

  const displayValue = editorValue === "" ? "" : editorValue || boilerplate;

  return (
    <div className={cn("min-h-full border-x", isOpen ? "w-3/4" : "w-full")}>
      <ResizablePanelGroup direction="vertical" className="w-full">
        <ResizablePanel defaultSize={60}>
          <ActionButtonsBar
            previousCode={previousCode}
            editorValue={editorValue}
          />
          <Editor
            height={"100%"}
            width={"100%"}
            value={displayValue}
            language={programmingLanguage.toLowerCase()}
            theme={editorTheme}
            options={options}
            onChange={(value) => handleEditorChange(value)}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            className="monaco-editor"
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="flex h-full items-center justify-center p-2">
            {/* <span className="font-semibold">Content</span> */}
            <div className="h-full w-full rounded-md border px-4 py-3">
              <div className="font-jetbrains_mono">
                <h1 className="font-extrabold uppercase text-teal-500">
                  avocoding:
                </h1>{" "}
                <p className="font-medium text-foreground">
                  {executedOutput} {"\n"}
                </p>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
