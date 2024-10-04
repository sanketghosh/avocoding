// PACKAGES
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor"; // Importing the monaco namespace
import { useEffect, useRef } from "react";

// LOCAL MODULES
import { useEditorStore } from "@/store/editor-store";

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

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // Function to handle editor mounting and save the reference
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    // monaco: Monaco,
  ) => {
    editorRef.current = editor; // Store the editor instance
  };

  useEffect(() => {
    if (editorRef.current && boilerplate) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== boilerplate) {
        editorRef.current.setValue(boilerplate);
      }
    }
  }, [boilerplate]);

  return (
    <div className="min-h-full w-3/4 border-x">
      <ResizablePanelGroup direction="vertical" className="w-full">
        <ResizablePanel defaultSize={60}>
          <ActionButtonsBar />
          <Editor
            height={"100%"}
            width={"100%"}
            defaultLanguage={programmingLanguage}
            defaultValue={boilerplate}
            theme={editorTheme}
            options={options}
            onMount={handleEditorDidMount}
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
