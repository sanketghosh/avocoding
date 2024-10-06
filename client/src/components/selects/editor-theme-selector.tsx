// LOCAL MODULES
import { useCodeStore } from "@/store/code-store";
import { CodeEditorTheme } from "@/types";

// COMPONENTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themes: CodeEditorTheme[] = ["vs-dark", "light"];

export default function EditorThemeSelector() {
  const { editorTheme, setEditorTheme } = useCodeStore();

  return (
    <Select
      value={editorTheme}
      onValueChange={(newTheme: CodeEditorTheme) => setEditorTheme(newTheme)}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder={editorTheme} />
      </SelectTrigger>
      <SelectContent>
        {themes.map((item) => (
          <SelectItem
            key={item}
            className="cursor-pointer font-medium capitalize"
            value={item}
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
