"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { Solution, LANGUAGE_OPTIONS } from "../../types/types";
import { CodeEditor } from "./code-editor";

interface SolutionsSectionProps {
  solutions: Solution[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Solution, value: string) => void;
}

export function SolutionsSection({
  solutions,
  onAdd,
  onRemove,
  onUpdate,
}: SolutionsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Solutions</CardTitle>
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Solution
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 relative"
          >
            {solutions.length > 1 && (
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
                value={solution.language}
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
              <Label>Solution Code</Label>
              <CodeEditor
                value={solution.code}
                onChange={(value) => onUpdate(index, "code", value)}
                language={solution.language}
                height="250px"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Explanation</Label>
              <Textarea
                value={solution.explanation}
                onChange={(e) => onUpdate(index, "explanation", e.target.value)}
                placeholder="We use a hash map to store the complement of each number..."
                required
                rows={4}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
