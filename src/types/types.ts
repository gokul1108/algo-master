export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Language = "PYTHON" | "JAVASCRIPT" | "JAVA";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expected: string;
}

export interface CodeSnippet {
  language: Language;
  starterCode: string;
}

export interface Solution {
  language: Language;
  code: string;
  explanation: string;
}

export interface ProblemFormData {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  constraints: string;
  hints: string;
  editorial: string;
  examples: ProblemExample[];
  testCases: TestCase[];
  codeSnippets: CodeSnippet[];
  solutions: Solution[];
}

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "PYTHON", label: "Python" },
  { value: "JAVASCRIPT", label: "JavaScript" },
  { value: "JAVA", label: "Java" },
];

export const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];

export const LANGUAGE_TO_MONACO: Record<Language, string> = {
  PYTHON: "python",
  JAVASCRIPT: "javascript",
  JAVA: "java",
};
