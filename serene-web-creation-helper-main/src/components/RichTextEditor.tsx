import { useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Strikethrough,
  Image,
  Highlighter,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ToolbarButton = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    title={title}
    className={cn(
      "p-1.5 rounded hover:bg-gray-200 transition-colors",
      active && "bg-gray-200 text-primary"
    )}
  >
    {children}
  </button>
);

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Rédigez votre contenu ici...",
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const highlightInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editorRef.current || isUpdatingRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isUpdatingRef.current = true;
    onChange(editorRef.current.innerHTML);
    setTimeout(() => { isUpdatingRef.current = false; }, 0);
  }, [onChange]);

  const exec = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleInput();
  }, [handleInput]);

  const isActive = (command: string) => {
    try { return document.queryCommandState(command); } catch { return false; }
  };

  const insertLink = () => {
    const url = window.prompt("Entrez l'URL du lien :", "https://");
    if (url) {
      const newTab = window.confirm("Ouvrir dans un nouvel onglet ?");
      if (newTab) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString() || url;
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.textContent = selectedText;
          range.deleteContents();
          range.insertNode(anchor);
          handleInput();
        }
      } else {
        exec("createLink", url);
      }
    }
  };

  const insertImage = () => {
    const url = window.prompt("Entrez l'URL de l'image :", "https://");
    if (url) {
      exec("insertHTML", `<img src="${url}" alt="image" style="max-width:100%;height:auto;display:block;margin:8px 0;" />`);
    }
  };

  const insertHR = () => {
    exec("insertHTML", "<hr/>");
  };

  const applyTextColor = (color: string) => {
    editorRef.current?.focus();
    document.execCommand("foreColor", false, color);
    handleInput();
  };

  const applyHighlight = (color: string) => {
    editorRef.current?.focus();
    document.execCommand("hiliteColor", false, color);
    handleInput();
  };

  return (
    <div className={cn("border rounded-md overflow-hidden bg-white", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50">
        <ToolbarButton onClick={() => exec("undo")} title="Annuler">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("redo")} title="Rétablir">
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => exec("formatBlock", "h1")}
          active={isActive("formatBlock")}
          title="Titre 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("formatBlock", "h2")}
          title="Titre 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("formatBlock", "h3")}
          title="Titre 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => exec("bold")}
          active={isActive("bold")}
          title="Gras"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("italic")}
          active={isActive("italic")}
          title="Italique"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("underline")}
          active={isActive("underline")}
          title="Souligné"
        >
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("strikeThrough")}
          active={isActive("strikeThrough")}
          title="Barré"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Couleur de texte */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              colorInputRef.current?.click();
            }}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors flex flex-col items-center"
            title="Couleur du texte"
          >
            <Palette className="w-4 h-4" />
          </button>
          <input
            ref={colorInputRef}
            type="color"
            defaultValue="#000000"
            className="absolute opacity-0 w-0 h-0"
            onChange={(e) => applyTextColor(e.target.value)}
          />
        </div>

        {/* Surlignage */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              highlightInputRef.current?.click();
            }}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Surligner le texte"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <input
            ref={highlightInputRef}
            type="color"
            defaultValue="#FFFF00"
            className="absolute opacity-0 w-0 h-0"
            onChange={(e) => applyHighlight(e.target.value)}
          />
        </div>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => exec("insertUnorderedList")}
          active={isActive("insertUnorderedList")}
          title="Liste à puces"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("insertOrderedList")}
          active={isActive("insertOrderedList")}
          title="Liste numérotée"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("formatBlock", "blockquote")}
          title="Citation"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => exec("justifyLeft")}
          active={isActive("justifyLeft")}
          title="Aligner à gauche"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("justifyCenter")}
          active={isActive("justifyCenter")}
          title="Centrer"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("justifyRight")}
          active={isActive("justifyRight")}
          title="Aligner à droite"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={insertLink} title="Insérer un lien">
          <Link className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insérer une image">
          <Image className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertHR} title="Séparateur horizontal">
          <Minus className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className={cn(
          "min-h-[300px] p-4 outline-none",
          "prose prose-sm max-w-none",
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3",
          "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-2",
          "[&_p]:mb-3 [&_p]:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-3",
          "[&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-3",
          "[&_li]:mb-1",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:mb-3",
          "[&_a]:text-primary [&_a]:underline",
          "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_img]:my-2",
          "[&_hr]:my-4 [&_hr]:border-gray-200",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
        )}
      />
    </div>
  );
}
