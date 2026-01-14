"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ProblemExample } from "../../types/types";

interface ExamplesSectionProps {
  examples: ProblemExample[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ProblemExample, value: string) => void;
}

export function ExamplesSection({
  examples,
  onAdd,
  onRemove,
  onUpdate,
}: ExamplesSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Examples</CardTitle>
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Example
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 relative"
          >
            {examples.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => onRemove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
            <div className="text-sm font-medium text-muted-foreground">
              Example {index + 1}
            </div>
            
            <div className="space-y-2">
              <Label>Input</Label>
              <Textarea
                value={example.input}
                onChange={(e) => onUpdate(index, "input", e.target.value)}
                placeholder="nums = [2,7,11,15], target = 9"
                required
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Output</Label>
              <Textarea
                value={example.output}
                onChange={(e) => onUpdate(index, "output", e.target.value)}
                placeholder="[0,1]"
                required
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Explanation (Optional)</Label>
              <Textarea
                value={example.explanation || ""}
                onChange={(e) => onUpdate(index, "explanation", e.target.value)}
                placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                rows={2}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
