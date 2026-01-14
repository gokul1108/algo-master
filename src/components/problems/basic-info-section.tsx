"use client";

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
import { Plus } from "lucide-react";
import { Difficulty, DIFFICULTY_OPTIONS } from "../../types/types";

interface BasicInfoSectionProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  tagInput: string;
  constraints: string;
  hints: string;
  editorial: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDifficultyChange: (value: Difficulty) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onConstraintsChange: (value: string) => void;
  onHintsChange: (value: string) => void;
  onEditorialChange: (value: string) => void;
}

export function BasicInfoSection({
  title,
  description,
  difficulty,
  tags,
  tagInput,
  constraints,
  hints,
  editorial,
  onTitleChange,
  onDescriptionChange,
  onDifficultyChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onConstraintsChange,
  onHintsChange,
  onEditorialChange,
}: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Two Sum"
            required
            minLength={5}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Given an array of integers nums and an integer target..."
            required
            minLength={10}
            rows={5}
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag();
                }
              }}
            />
            <Button type="button" onClick={onAddTag} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Constraints */}
        <div className="space-y-2">
          <Label htmlFor="constraints">Constraints</Label>
          <Textarea
            id="constraints"
            value={constraints}
            onChange={(e) => onConstraintsChange(e.target.value)}
            placeholder="2 <= nums.length <= 10^4"
            required
            minLength={5}
            rows={3}
          />
        </div>

        {/* Hints */}
        <div className="space-y-2">
          <Label htmlFor="hints">Hints (Optional)</Label>
          <Textarea
            id="hints"
            value={hints}
            onChange={(e) => onHintsChange(e.target.value)}
            placeholder="Think about using a hash map..."
            rows={3}
          />
        </div>

        {/* Editorial */}
        <div className="space-y-2">
          <Label htmlFor="editorial">Editorial (Optional)</Label>
          <Textarea
            id="editorial"
            value={editorial}
            onChange={(e) => onEditorialChange(e.target.value)}
            placeholder="Detailed explanation of the solution..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
