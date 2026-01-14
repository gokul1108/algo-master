"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import {
  useProblemForm,
  BasicInfoSection,
  ExamplesSection,
  TestCasesSection,
  CodeSnippetsSection,
  SolutionsSection,
} from "@/components/problems";

export default function CreateProblemPage() {
  const {
    formData,
    isLoading,
    tagInput,
    setTagInput,
    updateField,
    addTag,
    removeTag,
    addExample,
    removeExample,
    updateExample,
    addTestCase,
    removeTestCase,
    updateTestCase,
    addCodeSnippet,
    removeCodeSnippet,
    updateCodeSnippet,
    addSolution,
    removeSolution,
    updateSolution,
    fillSampleData,
    handleSubmit,
  } = useProblemForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Problem</h1>
        <Button type="button" variant="outline" onClick={fillSampleData}>
          <Wand2 className="h-4 w-4 mr-2" />
          Fill Sample Data
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Basic Information */}
        <BasicInfoSection
          title={formData.title}
          description={formData.description}
          difficulty={formData.difficulty}
          tags={formData.tags}
          tagInput={tagInput}
          constraints={formData.constraints}
          hints={formData.hints}
          editorial={formData.editorial}
          onTitleChange={(value) => updateField("title", value)}
          onDescriptionChange={(value) => updateField("description", value)}
          onDifficultyChange={(value) => updateField("difficulty", value)}
          onTagInputChange={setTagInput}
          onAddTag={addTag}
          onRemoveTag={removeTag}
          onConstraintsChange={(value) => updateField("constraints", value)}
          onHintsChange={(value) => updateField("hints", value)}
          onEditorialChange={(value) => updateField("editorial", value)}
        />

        {/* Examples */}
        <ExamplesSection
          examples={formData.examples}
          onAdd={addExample}
          onRemove={removeExample}
          onUpdate={updateExample}
        />

        {/* Test Cases */}
        <TestCasesSection
          testCases={formData.testCases}
          onAdd={addTestCase}
          onRemove={removeTestCase}
          onUpdate={updateTestCase}
        />

        {/* Code Snippets */}
        <CodeSnippetsSection
          codeSnippets={formData.codeSnippets}
          onAdd={addCodeSnippet}
          onRemove={removeCodeSnippet}
          onUpdate={updateCodeSnippet}
        />

        {/* Solutions */}
        <SolutionsSection
          solutions={formData.solutions}
          onAdd={addSolution}
          onRemove={removeSolution}
          onUpdate={updateSolution}
        />

        {/* Submit Buttons */}
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
}
