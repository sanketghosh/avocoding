// PACKAGES
import Editor, { Monaco } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// LOCAL MODULES
import { debounce } from "@/lib/debounce";
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

export function EditorPanel() {
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
    code,
    isEditing,
    startEditing,
  } = useCodeStore();
  const { isOpen } = useSidePanelStore();
  const { id } = useParams<{ id: string }>();
  const decodedQuestionId = decodeId(id!);

  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      allowNonTsExtensions: true,
      lib: ["es2018"],
    });
  };

  // const handleEditorChange = (value: string | undefined) => {
  //   if (value !== undefined) {
  //     setCode(value);
  //   }
  // };

  const handleEditorChange = useCallback(
    debounce((value: string | undefined) => {
      if (value !== undefined) {
        setEditorValue(value);
        setCode(value);
      }
    }, 5000),
    [setCode],
  );

  const handleEditorDidMount = () => {
    startEditing();
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["get-code"],
    queryFn: () =>
      getCodeAction.getCodeAction({ questionId: decodedQuestionId }),
    staleTime: 10,
    // enabled: !!decodedQuestionId,
  });

  // console.log(data);

  useEffect(() => {
    if (isSuccess && data?.data) {
      // console.log({
      //   code: data?.data?.content,
      //   editorTheme: data?.data?.editorTheme,
      //   programmingLang: data?.data?.language,
      // });

      if (!isEditing) {
        setEditorValue(data?.data?.content);
      }
      setEditorTheme(data?.data?.editorTheme);
      setProgrammingLanguage(data?.data?.language);
      // setFolders(data?.data);
    }
  }, [
    isSuccess,
    data,
    setEditorTheme,
    setProgrammingLanguage,
    setEditorValue,
    isEditing,
  ]);

  // console.log(programmingLanguage.toLowerCase());
  // console.log(programmingLanguage);
  // console.log(code);

  const baseEditorVal = isEditing ? code : boilerplate;
  // const editorValue = isEditing ? data?.data?.content : boilerplate;

  return (
    <div className={cn("min-h-full border-x", isOpen ? "w-3/4" : "w-full")}>
      <ResizablePanelGroup direction="vertical" className="w-full">
        <ResizablePanel defaultSize={60}>
          <ActionButtonsBar />
          <Editor
            height={"100%"}
            width={"100%"}
            value={editorValue || baseEditorVal}
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
            <div className="h-full w-full rounded-md border">
              <h1>command line</h1>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
