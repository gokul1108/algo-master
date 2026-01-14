"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { CodeSnippet, LANGUAGE_OPTIONS } from "@/types/types";
import { CodeEditor } from "./code-editor";

interface CodeSnippetsSectionProps {
  codeSnippets: CodeSnippet[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof CodeSnippet, value: string) => void;
}

export function CodeSnippetsSection({
  codeSnippets,
  onAdd,
  onRemove,
  onUpdate,
}: CodeSnippetsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Code Snippets (Starter Code)</CardTitle>
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Language
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 relative"
          >
            {codeSnippets.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => onRemove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
            
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={snippet.language}
                onValueChange={(value) => onUpdate(index, "language", value)}
              >
                <SelectTrigger className="w-full max-w-[200px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Starter Code</Label>
              <CodeEditor
                value={snippet.starterCode}
                onChange={(value) => onUpdate(index, "starterCode", value)}
                language={snippet.language}
                height="180px"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
