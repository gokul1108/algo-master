"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Difficulty = "EASY" | "MEDIUM" | "HARD";
type Language = "PYTHON" | "JAVASCRIPT" | "JAVA";

interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

interface TestCase {
  input: string;
  expected: string;
}

interface CodeSnippet {
  language: Language;
  starterCode: string;
}

interface Solution {
  language: Language;
  code: string;
  explanation: string;
}

const CreateProblem = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Basic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [constraints, setConstraints] = useState("");
  const [hints, setHints] = useState("");
  const [editorial, setEditorial] = useState("");

  // Examples
  const [examples, setExamples] = useState<ProblemExample[]>([
    { input: "", output: "", explanation: "" },
  ]);

  // Test cases
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", expected: "" },
  ]);

  // Code snippets
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([
    { language: "PYTHON", starterCode: "" },
  ]);

  // Solutions
  const [solutions, setSolutions] = useState<Solution[]>([
    { language: "PYTHON", code: "", explanation: "" },
  ]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addExample = () => {
    setExamples([...examples, { input: "", output: "", explanation: "" }]);
  };

  const removeExample = (index: number) => {
    if (examples.length > 1) {
      setExamples(examples.filter((_, i) => i !== index));
    }
  };

  const updateExample = (
    index: number,
    field: keyof ProblemExample,
    value: string
  ) => {
    const updated = [...examples];
    updated[index] = { ...updated[index], [field]: value };
    setExamples(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expected: "" }]);
  };

  const removeTestCase = (index: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const addCodeSnippet = () => {
    setCodeSnippets([...codeSnippets, { language: "PYTHON", starterCode: "" }]);
  };

  const removeCodeSnippet = (index: number) => {
    if (codeSnippets.length > 1) {
      setCodeSnippets(codeSnippets.filter((_, i) => i !== index));
    }
  };

  const updateCodeSnippet = (
    index: number,
    field: keyof CodeSnippet,
    value: string
  ) => {
    const updated = [...codeSnippets];
    updated[index] = { ...updated[index], [field]: value as Language };
    setCodeSnippets(updated);
  };

  const addSolution = () => {
    setSolutions([
      ...solutions,
      { language: "PYTHON", code: "", explanation: "" },
    ]);
  };

  const removeSolution = (index: number) => {
    if (solutions.length > 1) {
      setSolutions(solutions.filter((_, i) => i !== index));
    }
  };

  const updateSolution = (
    index: number,
    field: keyof Solution,
    value: string
  ) => {
    const updated = [...solutions];
    updated[index] = { ...updated[index], [field]: value as Language };
    setSolutions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const problemData = {
      title,
      description,
      difficulty,
      tags,
      constraints,
      hints: hints || undefined,
      editorial: editorial || undefined,
      examples: examples.map((ex) => ({
        input: ex.input,
        output: ex.output,
        explanation: ex.explanation || undefined,
      })),
      testCases,
      codeSnippets,
      solution: solutions,
    };

    try {
      const response = await fetch("/api/create-problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Problem created successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setDifficulty("EASY");
        setTags([]);
        setConstraints("");
        setHints("");
        setEditorial("");
        setExamples([{ input: "", output: "", explanation: "" }]);
        setTestCases([{ input: "", expected: "" }]);
        setCodeSnippets([{ language: "PYTHON", starterCode: "" }]);
        setSolutions([{ language: "PYTHON", code: "", explanation: "" }]);
      } else {
        toast.error(result.error || "Failed to create problem");
      }
    } catch (error) {
      toast.error("An error occurred while creating the problem");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Problem</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Two Sum"
                required
                minLength={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Given an array of integers nums and an integer target..."
                required
                minLength={10}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(value: Difficulty) => setDifficulty(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="constraints">Constraints</Label>
              <Textarea
                id="constraints"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="2 <= nums.length <= 10^4"
                required
                minLength={5}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hints">Hints (Optional)</Label>
              <Textarea
                id="hints"
                value={hints}
                onChange={(e) => setHints(e.target.value)}
                placeholder="Think about using a hash map..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editorial">Editorial (Optional)</Label>
              <Textarea
                id="editorial"
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
                placeholder="Detailed explanation of the solution..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Examples</CardTitle>
            <Button
              type="button"
              onClick={addExample}
              variant="outline"
              size="sm"
            >
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
                    onClick={() => removeExample(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
                <div className="text-sm font-medium">Example {index + 1}</div>
                <div className="space-y-2">
                  <Label>Input</Label>
                  <Textarea
                    value={example.input}
                    onChange={(e) =>
                      updateExample(index, "input", e.target.value)
                    }
                    placeholder="nums = [2,7,11,15], target = 9"
                    required
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Output</Label>
                  <Textarea
                    value={example.output}
                    onChange={(e) =>
                      updateExample(index, "output", e.target.value)
                    }
                    placeholder="[0,1]"
                    required
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <Textarea
                    value={example.explanation || ""}
                    onChange={(e) =>
                      updateExample(index, "explanation", e.target.value)
                    }
                    placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Cases */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Test Cases</CardTitle>
            <Button
              type="button"
              onClick={addTestCase}
              variant="outline"
              size="sm"
            >
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
                    onClick={() => removeTestCase(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
                <div className="text-sm font-medium">Test Case {index + 1}</div>
                <div className="space-y-2">
                  <Label>Input</Label>
                  <Textarea
                    value={testCase.input}
                    onChange={(e) =>
                      updateTestCase(index, "input", e.target.value)
                    }
                    placeholder='{"nums": [2,7,11,15], "target": 9}'
                    required
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expected Output</Label>
                  <Textarea
                    value={testCase.expected}
                    onChange={(e) =>
                      updateTestCase(index, "expected", e.target.value)
                    }
                    placeholder="[0,1]"
                    required
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Code Snippets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Code Snippets (Starter Code)</CardTitle>
            <Button
              type="button"
              onClick={addCodeSnippet}
              variant="outline"
              size="sm"
            >
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
                    className="absolute top-2 right-2"
                    onClick={() => removeCodeSnippet(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={snippet.language}
                    onValueChange={(value) =>
                      updateCodeSnippet(index, "language", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PYTHON">Python</SelectItem>
                      <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                      <SelectItem value="JAVA">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Starter Code</Label>
                  <Textarea
                    value={snippet.starterCode}
                    onChange={(e) =>
                      updateCodeSnippet(index, "starterCode", e.target.value)
                    }
                    placeholder="def twoSum(nums, target):"
                    required
                    rows={5}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Solutions</CardTitle>
            <Button
              type="button"
              onClick={addSolution}
              variant="outline"
              size="sm"
            >
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
                    className="absolute top-2 right-2"
                    onClick={() => removeSolution(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={solution.language}
                    onValueChange={(value) =>
                      updateSolution(index, "language", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PYTHON">Python</SelectItem>
                      <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                      <SelectItem value="JAVA">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Solution Code</Label>
                  <Textarea
                    value={solution.code}
                    onChange={(e) =>
                      updateSolution(index, "code", e.target.value)
                    }
                    placeholder=""
                    required
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Explanation</Label>
                  <Textarea
                    value={solution.explanation}
                    onChange={(e) =>
                      updateSolution(index, "explanation", e.target.value)
                    }
                    placeholder="We use a hash map to store the complement of each number..."
                    required
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Problem
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProblem;
