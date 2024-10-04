// PACKAGES
import { PlayIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";

// COMPONENTS
import CodeEditorThemeSwitcher from "@/components/code-editor/actions-buttons/code-editor-theme-switcher";
import ProgrammingLanguageSelector from "@/components/code-editor/actions-buttons/programming-language-selector";
import { Button } from "@/components/ui/button";

export default function ActionButtonsBar() {
  return (
    <div className="h-14">
      <div className="flex h-full items-center justify-between space-x-3 px-3">
        <div className="flex items-center gap-3">
          <ProgrammingLanguageSelector />
          <Button
            size={"sm"}
            className="flex items-center gap-1 bg-green-800/20 text-green-500 hover:bg-green-800/30"
            variant={"secondary"}
          >
            <PlayIcon size={20} />
            <p>Run Code</p>
          </Button>
          <Button
            size={"sm"}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            <SaveIcon size={20} />
            <p>Save</p>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <CodeEditorThemeSwitcher />
          <Button
            size={"sm"}
            variant={"secondary"}
            className="flex items-center gap-1"
          >
            <XIcon size={20} />
            <p>Clear</p>
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            className="flex items-center gap-1"
          >
            <Trash2Icon size={20} />
            <p>Delete</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
