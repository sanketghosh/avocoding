// LOCAL MODULES
import { useEditorStore } from "@/store/editor-store";
import { ProgrammingLanguageType } from "@/types";

// COMPONENTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function LanguageSelector() {
  const { programmingLanguage, setProgrammingLanguage } = useEditorStore();

  return (
    <Select
      value={programmingLanguage}
      onValueChange={(newValue: ProgrammingLanguageType) =>
        setProgrammingLanguage(newValue)
      }
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder={programmingLanguage} />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_PROGRAMMING_LANGUAGES.map((item) => (
          <SelectItem value={item} key={item} className="cursor-pointer">
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
