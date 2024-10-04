// PACKAGES
import { useEditorStore } from "@/store/editor-store";
import { CodeEditorTheme } from "@/types";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes: CodeEditorTheme[] = ["vs-dark", "light"];

export default function CodeEditorThemeSwitcher() {
  const { editorTheme, setEditorTheme } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="flex items-center gap-1 font-medium capitalize"
        >
          {editorTheme}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => setEditorTheme(item)}
            className="cursor-pointer font-medium capitalize"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
