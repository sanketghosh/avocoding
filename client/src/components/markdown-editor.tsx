// PACKAGES
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

// LOCAL MODULES
import "@/index.css";
import { cn } from "@/lib/utils";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // @ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const editor = useEditor({
    extensions: extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const newValue = editor.getHTML();
      onChange(newValue);
    },
  });

  // Ensure the editor content is updated if form value changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="space-y-3">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border p-3 text-sm">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          editor.isActive("bold") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          editor.isActive("italic") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          editor.isActive("strike") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          editor.isActive("code") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
        type="button"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
        type="button"
      >
        Clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          editor.isActive("paragraph") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          editor.isActive("heading", { level: 1 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          editor.isActive("heading", { level: 2 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          editor.isActive("heading", { level: 3 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          editor.isActive("heading", { level: 4 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          editor.isActive("heading", { level: 5 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          editor.isActive("heading", { level: 6 }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          editor.isActive("bulletList") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Bullet list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          editor.isActive("orderedList") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Ordered list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          editor.isActive("codeBlock") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Code block
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          editor.isActive("blockquote") && "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Blockquote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
      >
        Horizontal rule
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
      >
        Hard break
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="rounded-sm border px-2 py-1 text-foreground"
      >
        Redo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={cn(
          editor.isActive("textStyle", { color: "#958DF1" }) &&
            "bg-secondary font-semibold",
          "rounded-sm border px-2 py-1 text-foreground",
        )}
      >
        Purple
      </button>
    </div>
  );
};
