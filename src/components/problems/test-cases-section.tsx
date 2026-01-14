"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { TestCase } from "../../types/types";

interface TestCasesSectionProps {
  testCases: TestCase[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof TestCase, value: string) => void;
}

export function TestCasesSection({
  testCases,
  onAdd,
  onRemove,
  onUpdate,
}: TestCasesSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Cases</CardTitle>
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Test Case
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {testCases.map((testCase, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 relative"
          >
            {testCases.length > 1 && (
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
              Test Case {index + 1}
            </div>
            
            <div className="space-y-2">
              <Label>Input</Label>
              <Textarea
                value={testCase.input}
                onChange={(e) => onUpdate(index, "input", e.target.value)}
                placeholder='{"nums": [2,7,11,15], "target": 9}'
                required
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Expected Output</Label>
              <Textarea
                value={testCase.expected}
                onChange={(e) => onUpdate(index, "expected", e.target.value)}
                placeholder="[0,1]"
                required
                rows={2}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
