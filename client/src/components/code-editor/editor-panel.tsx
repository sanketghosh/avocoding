// PACKAGES
import Editor from "@monaco-editor/react";

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

  return (
    <div className="min-h-full w-3/4 border-x">
      <ResizablePanelGroup direction="vertical" className="w-full">
        <ResizablePanel defaultSize={60}>
          <ActionButtonsBar />
          <Editor
            height={"100%"}
            width={"100%"}
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
            options={options}
            className="monaco-editor"
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="flex h-full items-center justify-center">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
