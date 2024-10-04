// components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// packages
import { useEditorStore } from "@/store/editor-store";
import { ProgrammingLanguageType } from "@/types";
import { Code2Icon } from "lucide-react";

const SUPPORTED_PROGRAMMING_LANGUAGES: ProgrammingLanguageType[] = [
  "C",
  "Cpp",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "CSharp",
];

export default function ProgrammingLanguageSelector() {
  const { programmingLanguage, setProgrammingLanguage } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className="flex w-32 items-center gap-2"
          variant={"secondary"}
        >
          <Code2Icon size={17} />
          <p>{programmingLanguage}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SUPPORTED_PROGRAMMING_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setProgrammingLanguage(lang)}
            className="cursor-pointer capitalize"
          >
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
