"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Language,
  ProblemExample,
  TestCase,
  CodeSnippet,
  Solution,
  ProblemFormData,
} from "../../types/types";

const INITIAL_FORM_DATA: ProblemFormData = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [],
  constraints: "",
  hints: "",
  editorial: "",
  examples: [{ input: "", output: "", explanation: "" }],
  testCases: [{ input: "", expected: "" }],
  codeSnippets: [{ language: "PYTHON", starterCode: "" }],
  solutions: [{ language: "PYTHON", code: "", explanation: "" }],
};

const SAMPLE_DATA: ProblemFormData = {
  title: "Two Sum",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  difficulty: "EASY",
  tags: ["Array", "Hash Table"],
  constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
  hints:
    "Think about using a hash map to store the numbers you've seen so far and their indices.",
  editorial: `The brute force approach would be to check every pair of numbers, which takes O(n^2) time. However, we can use a hash map to achieve O(n) time complexity. As we iterate through the array, we check if the complement (target - current number) exists in the hash map. If it does, we've found our answer. If not, we add the current number and its index to the hash map.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "",
    },
  ],
  testCases: [
    { input: "[2,7,11,15]\n9", expected: "[0,1]" },
    { input: "[3,2,4]\n6", expected: "[1,2]" },
    { input: "[3,3]\n6", expected: "[0,1]" },
    { input: "[1,2,3,4,5]\n9", expected: "[3,4]" },
  ],
  codeSnippets: [
    {
      language: "PYTHON",
      starterCode: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
    },
    {
      language: "JAVASCRIPT",
      starterCode: `function twoSum(nums, target) {
    // Write your solution here
}`,
    },
  ],
  solutions: [
    {
      language: "PYTHON",
      code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      explanation:
        "We use a hash map to store each number and its index. For each number, we check if its complement exists in the map.",
    },
    {
      language: "JAVASCRIPT",
      code: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      explanation: "Same approach using JavaScript Map for O(1) lookups.",
    },
  ],
};

export function useProblemForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProblemFormData>(INITIAL_FORM_DATA);
  const [tagInput, setTagInput] = useState("");

  // Basic field updates
  const updateField = useCallback(
    <K extends keyof ProblemFormData>(field: K, value: ProblemFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Tag management
  const addTag = useCallback(() => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  }, [tagInput, formData.tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // Examples management
  const addExample = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }));
  }, []);

  const removeExample = useCallback((index: number) => {
    setFormData((prev) => {
      if (prev.examples.length > 1) {
        return {
          ...prev,
          examples: prev.examples.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }, []);

  const updateExample = useCallback(
    (index: number, field: keyof ProblemExample, value: string) => {
      setFormData((prev) => {
        const updated = [...prev.examples];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, examples: updated };
      });
    },
    []
  );

  // Test cases management
  const addTestCase = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expected: "" }],
    }));
  }, []);

  const removeTestCase = useCallback((index: number) => {
    setFormData((prev) => {
      if (prev.testCases.length > 1) {
        return {
          ...prev,
          testCases: prev.testCases.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }, []);

  const updateTestCase = useCallback(
    (index: number, field: keyof TestCase, value: string) => {
      setFormData((prev) => {
        const updated = [...prev.testCases];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, testCases: updated };
      });
    },
    []
  );

  // Code snippets management
  const addCodeSnippet = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      codeSnippets: [
        ...prev.codeSnippets,
        { language: "PYTHON" as Language, starterCode: "" },
      ],
    }));
  }, []);

  const removeCodeSnippet = useCallback((index: number) => {
    setFormData((prev) => {
      if (prev.codeSnippets.length > 1) {
        return {
          ...prev,
          codeSnippets: prev.codeSnippets.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }, []);

  const updateCodeSnippet = useCallback(
    (index: number, field: keyof CodeSnippet, value: string) => {
      setFormData((prev) => {
        const updated = [...prev.codeSnippets];
        updated[index] = { ...updated[index], [field]: value as Language };
        return { ...prev, codeSnippets: updated };
      });
    },
    []
  );

  // Solutions management
  const addSolution = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      solutions: [
        ...prev.solutions,
        { language: "PYTHON" as Language, code: "", explanation: "" },
      ],
    }));
  }, []);

  const removeSolution = useCallback((index: number) => {
    setFormData((prev) => {
      if (prev.solutions.length > 1) {
        return {
          ...prev,
          solutions: prev.solutions.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  }, []);

  const updateSolution = useCallback(
    (index: number, field: keyof Solution, value: string) => {
      setFormData((prev) => {
        const updated = [...prev.solutions];
        updated[index] = { ...updated[index], [field]: value as Language };
        return { ...prev, solutions: updated };
      });
    },
    []
  );

  // Fill sample data
  const fillSampleData = useCallback(() => {
    setFormData(SAMPLE_DATA);
    toast.success("Sample data filled!");
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    const problemData = {
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      tags: formData.tags,
      constraints: formData.constraints,
      hints: formData.hints || undefined,
      editorial: formData.editorial || undefined,
      examples: formData.examples.map((ex) => ({
        input: ex.input,
        output: ex.output,
        explanation: ex.explanation || undefined,
      })),
      testCases: formData.testCases,
      codeSnippets: formData.codeSnippets,
      solution: formData.solutions,
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
        resetForm();
        return true;
      } else {
        toast.error(result.error || "Failed to create problem");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the problem");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData, resetForm]);

  return {
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
    resetForm,
    handleSubmit,
  };
}
