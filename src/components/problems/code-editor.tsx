"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Language, LANGUAGE_TO_MONACO } from "../../types/types";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  height?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  height = "200px",
  readOnly = false,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height={height}
        language={LANGUAGE_TO_MONACO[language]}
        value={value}
        onChange={(val) => onChange(val || "")}
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          readOnly,
          padding: { top: 8, bottom: 8 },
        }}
      />
    </div>
  );
}
