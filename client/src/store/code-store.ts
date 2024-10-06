import { CodeEditorTheme, ProgrammingLanguageType } from "@/types";
import { create } from "zustand";

type CodeStoreType = {
  editorTheme: CodeEditorTheme;
  programmingLanguage: ProgrammingLanguageType;
  boilerplate: string;
  code: string;
  isEditing: boolean;

  setEditorTheme: (newTheme: CodeEditorTheme) => void;
  setProgrammingLanguage: (newLanguage: ProgrammingLanguageType) => void;
  setBoilerplate: (newBoilerplate: string) => void;
  setCode: (newCode: string) => void;
  startEditing: () => void;
};

export const useCodeStore = create<CodeStoreType>((set) => ({
  editorTheme: "vs-dark", // default editor theme
  programmingLanguage: "JavaScript", // default programming language
  boilerplate: `console.log("Hello, World!");`,
  code: `console.log("Hello, World!");`,
  isEditing: false,

  setEditorTheme: (newTheme: CodeEditorTheme) => set({ editorTheme: newTheme }),
  setProgrammingLanguage: (newLanguage: ProgrammingLanguageType) =>
    set({
      programmingLanguage: newLanguage,
      boilerplate: getBoilerplate(newLanguage),
      code: getBoilerplate(newLanguage),
      isEditing: false,
    }),
  setBoilerplate: (newBoilerplate: string) =>
    set({
      boilerplate: newBoilerplate,
    }),

  setCode: (newCode: string) =>
    set({
      code: newCode,
    }),

  startEditing: () =>
    set({
      isEditing: true,
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
