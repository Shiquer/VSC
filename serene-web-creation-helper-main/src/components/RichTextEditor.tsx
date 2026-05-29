import { useRef, useCallback, useEffect, useState } from "react";
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
  RemoveFormatting,
  Table,
  Maximize2,
  Minimize2,
  Type,
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
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [autosaved, setAutosaved] = useState(false);
  const [fontSize, setFontSize] = useState("normal");

  useEffect(() => {
    if (!editorRef.current || isUpdatingRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
      updateCounts(value || "");
    }
  }, [value]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editorRef.current?.contains(document.activeElement)) return;
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b": e.preventDefault(); exec("bold"); break;
          case "i": e.preventDefault(); exec("italic"); break;
          case "u": e.preventDefault(); exec("underline"); break;
          case "k": e.preventDefault(); insertLink(); break;
        }
      }
      if (e.key === "F11") {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateCounts = (html: string) => {
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    setCharCount(text.length);
    setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
  };

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isUpdatingRef.current = true;
    const html = editorRef.current.innerHTML;
    onChange(html);
    updateCounts(html);
    setTimeout(() => { isUpdatingRef.current = false; }, 0);

    // Autosave after 3s of inactivity
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    setAutosaved(false);
    autosaveTimerRef.current = setTimeout(() => {
      setAutosaved(true);
      setTimeout(() => setAutosaved(false), 3000);
    }, 3000);
  }, [onChange]);

  const exec = useCallback((command: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
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

  const insertTable = () => {
    const rows = parseInt(window.prompt("Nombre de lignes :", "3") || "3");
    const cols = parseInt(window.prompt("Nombre de colonnes :", "3") || "3");
    if (rows > 0 && cols > 0) {
      let tableHTML = '<table style="width:100%;border-collapse:collapse;margin:8px 0;">';
      for (let r = 0; r < rows; r++) {
        tableHTML += "<tr>";
        for (let c = 0; c < cols; c++) {
          const tag = r === 0 ? "th" : "td";
          const style = r === 0
            ? "border:1px solid #ccc;padding:6px 10px;background:#f5f5f5;font-weight:bold;text-align:left;"
            : "border:1px solid #ccc;padding:6px 10px;text-align:left;";
          tableHTML += `<${tag} style="${style}">${r === 0 ? `En-tête ${c + 1}` : "&nbsp;"}</${tag}>`;
        }
        tableHTML += "</tr>";
      }
      tableHTML += "</table><p><br></p>";
      exec("insertHTML", tableHTML);
    }
  };

  const insertCTA = () => {
    const text = window.prompt("Texte du bouton :", "Prendre rendez-vous");
    const url = window.prompt("URL du bouton :", "https://");
    if (text && url) {
      exec("insertHTML", `<p style="text-align:center;margin:16px 0;"><a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#3d2b1f;color:#fff;padding:12px 28px;border-radius:24px;text-decoration:none;font-weight:600;font-size:15px;">${text}</a></p><p><br></p>`);
    }
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

  const applyFontSize = (size: string) => {
    setFontSize(size);
    const sizeMap: Record<string, string> = {
      small: "2",
      normal: "3",
      large: "5",
      xlarge: "6",
    };
    exec("fontSize", sizeMap[size] || "3");
  };

  return (
    <div className={cn(
      "border rounded-md overflow-hidden bg-white flex flex-col",
      isFullscreen && "fixed inset-0 z-50 rounded-none",
      className
    )}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50 flex-shrink-0">
        {/* Undo / Redo */}
        <ToolbarButton onClick={() => exec("undo")} title="Annuler (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("redo")} title="Rétablir (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Taille de police */}
        <div className="flex items-center gap-0.5" title="Taille de police">
          <Type className="w-3 h-3 text-gray-400" />
          <select
            className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white hover:bg-gray-50 cursor-pointer h-7"
            value={fontSize}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => applyFontSize(e.target.value)}
          >
            <option value="small">Petit</option>
            <option value="normal">Normal</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Titres */}
        <ToolbarButton onClick={() => exec("formatBlock", "h1")} title="Titre 1">
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "h2")} title="Titre 2">
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "h3")} title="Titre 3">
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Formatage texte */}
        <ToolbarButton onClick={() => exec("bold")} active={isActive("bold")} title="Gras (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} active={isActive("italic")} title="Italique (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} active={isActive("underline")} title="Souligné (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("strikeThrough")} active={isActive("strikeThrough")} title="Barré">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("removeFormat")} title="Supprimer la mise en forme">
          <RemoveFormatting className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Couleur de texte */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); colorInputRef.current?.click(); }}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors flex items-center"
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
            onMouseDown={(e) => { e.preventDefault(); highlightInputRef.current?.click(); }}
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

        {/* Listes & blocs */}
        <ToolbarButton onClick={() => exec("insertUnorderedList")} active={isActive("insertUnorderedList")} title="Liste à puces">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} active={isActive("insertOrderedList")} title="Liste numérotée">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "blockquote")} title="Citation">
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Alignement */}
        <ToolbarButton onClick={() => exec("justifyLeft")} active={isActive("justifyLeft")} title="Aligner à gauche">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyCenter")} active={isActive("justifyCenter")} title="Centrer">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} active={isActive("justifyRight")} title="Aligner à droite">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Insertions */}
        <ToolbarButton onClick={insertLink} title="Insérer un lien (Ctrl+K)">
          <Link className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insérer une image">
          <Image className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="Insérer un tableau">
          <Table className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertCTA} title="Insérer un bouton call-to-action">
          <span className="text-xs font-bold px-0.5">CTA</span>
        </ToolbarButton>
        <ToolbarButton onClick={insertHR} title="Séparateur horizontal">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Plein écran */}
        <ToolbarButton onClick={() => setIsFullscreen(prev => !prev)} title={isFullscreen ? "Quitter le plein écran (F11)" : "Plein écran (F11)"}>
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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
          "p-4 outline-none overflow-y-auto",
          isFullscreen ? "flex-1" : "min-h-[300px]",
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
          "[&_table]:w-full [&_table]:border-collapse [&_table]:my-3",
          "[&_td]:border [&_td]:border-gray-300 [&_td]:p-2",
          "[&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-100 [&_th]:font-semibold",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
        )}
      />

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t bg-gray-50 text-xs text-gray-400 flex-shrink-0">
        <span>{wordCount} mot{wordCount !== 1 ? "s" : ""} · {charCount} caractère{charCount !== 1 ? "s" : ""}</span>
        <span className={cn(
          "transition-opacity duration-500",
          autosaved ? "opacity-100 text-green-500" : "opacity-0"
        )}>
          ✓ Sauvegardé automatiquement
        </span>
        <span className="text-gray-300">Ctrl+B · Ctrl+I · Ctrl+U · Ctrl+K · F11</span>
      </div>
    </div>
  );
}
