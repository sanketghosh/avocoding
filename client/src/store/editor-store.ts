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
    case "C":
      return '#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}';
    case "Cpp":
      return '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!\\n";\n\treturn 0;\n}';
    case "Python":
      return 'print("Hello, World!")';
    case "JavaScript":
      return 'console.log("Hello, World!");';
    case "TypeScript":
      return 'console.log("Hello, World!");';
    case "CSharp":
      return 'using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}';
    case "Java":
      return 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}';
    case "Go":
      return 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}';
    default:
      return "// some comment";
  }
}
