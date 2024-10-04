import { CodeEditorTheme, ProgrammingLanguageType } from "@/types";
import { create } from "zustand";

type EditorStoreType = {
  editorTheme: CodeEditorTheme;
  programmingLanguage: ProgrammingLanguageType;
  boilerplate: string;

  setEditorTheme: (newTheme: CodeEditorTheme) => void;
  setProgrammingLanguage: (newLanguage: ProgrammingLanguageType) => void;
  setBoilerplate: (newBoilerplate: string) => void;
};

export const useEditorStore = create<EditorStoreType>((set) => ({
  editorTheme: "vs-dark", // default editor theme
  programmingLanguage: "javascript", // default programming language
  boilerplate: `console.log("Hello, World!");`,

  setEditorTheme: (newTheme: CodeEditorTheme) => set({ editorTheme: newTheme }),
  setProgrammingLanguage: (newLanguage: ProgrammingLanguageType) =>
    set({
      programmingLanguage: newLanguage,
      boilerplate: getBoilerplate(newLanguage),
    }),
  setBoilerplate: (newBoilerplate: string) =>
    set({
      boilerplate: newBoilerplate,
    }),
}));

// Helper function to get boilerplate code for each language
function getBoilerplate(language: string) {
  switch (language) {
    case "c":
      return '#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}';
    case "cpp":
      return '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!\\n";\n\treturn 0;\n}';
    case "python":
      return 'print("Hello, World!")';
    case "javascript":
      return 'console.log("Hello, World!");';
    case "typescript":
      return 'console.log("Hello, World!");';
    case "csharp":
      return 'using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}';
    case "java":
      return 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}';
    case "go":
      return 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}';
    default:
      return "// some comment";
  }
}
