// PACKAGES
import Editor, { Monaco } from "@monaco-editor/react";

// LOCAL MODULES
import { useEditorStore } from "@/store/editor-store";
import { useSidePanelStore } from "@/store/side-panel-store";
import { cn } from "@/lib/utils";

// COMPONENTS
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

  const { editorTheme, boilerplate, programmingLanguage } = useEditorStore();
  const { isOpen } = useSidePanelStore();

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      module: monaco.languages.typescript.ModuleKind.ES2015,
      allowNonTsExtensions: true,
      lib: ["es2018"],
    });
  }

  // console.log(programmingLanguage.toLowerCase());
  console.log(programmingLanguage);

  return (
    <div className={cn("min-h-full border-x", isOpen ? "w-3/4" : "w-full")}>
      <ResizablePanelGroup direction="vertical" className="w-full">
        <ResizablePanel defaultSize={60}>
          <ActionButtonsBar />
          <Editor
            height={"100%"}
            width={"100%"}
            value={boilerplate}
            language={programmingLanguage.toLowerCase()}
            theme={editorTheme}
            options={options}
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
