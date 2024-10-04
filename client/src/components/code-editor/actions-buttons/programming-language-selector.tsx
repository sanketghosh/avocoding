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

const SUPPORTED_PROGRAMMING_LANGUAGES: ProgrammingLanguageType[] = [
  "c",
  "cpp",
  "java",
  "python",
  "javascript",
  "typescript",
  "go",
  "csharp",
];

export default function ProgrammingLanguageSelector() {
  const { programmingLanguage, setProgrammingLanguage } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className="flex w-32 items-center gap-1 bg-purple-800/20 capitalize text-purple-500 hover:bg-purple-800/30"
          variant={"secondary"}
        >
          {programmingLanguage}
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
