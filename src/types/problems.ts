
// const { title, description, difficulty, tags, examples, constraints, hints, editorial, testCases, codeSnippets, solution } = body;

import {z} from "zod";
import { Difficulty,Language } from "@/generated/prisma/enums";



interface Problem {
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: string[];
    
}

export const DifficultySchema = z.enum(Difficulty);
export const LanguageSchema = z.enum(Language);

export type DifficultyType = z.infer<typeof DifficultySchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;

export const ProblemExampleSchema = z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional()
});
export type ProblemExample = z.infer<typeof ProblemExampleSchema>;

export const TestCasesSchema = z.object({
    input: z.string(),
    expected: z.string()
});
export type TestCase = z.infer<typeof TestCasesSchema>;


export const CodeSnippetSchema = z.object({
    language: LanguageSchema,
    starterCode: z.string()
});
export type CodeSnippet = z.infer<typeof CodeSnippetSchema>;


export const SolutionSchema = z.object({
    language:LanguageSchema,
    code: z.string(),
    explanation: z.string()

})
export type Solution = z.infer<typeof SolutionSchema>;


export const CreateProblemSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    difficulty: DifficultySchema,
    tags: z.array(z.string()).min(1),

    constraints: z.string().min(5),
    hints:z.string().min(5).optional(),
    editorial:z.string().min(10).optional(),

    examples: z.array(ProblemExampleSchema).min(1),
    testCases:z.array(TestCasesSchema).min(1),
    codeSnippets: z.array(CodeSnippetSchema).min(1),
    solution: z.array(SolutionSchema).min(1)


});

export type CreateProblem = z.infer<typeof CreateProblemSchema>;

export const ProblemReadSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    difficulty: DifficultySchema,
    tags: z.array(z.string()),
    
    constraints: z.string(),
    hints:z.string().optional(),
    editorial:z.string().optional(),

    examples: z.array(ProblemExampleSchema),
    testCases:z.array(TestCasesSchema),
    codeSnippets: z.array(CodeSnippetSchema),
    solution: z.array(SolutionSchema),


    createdAt: z.date(),
    updatedAt: z.date()
});

export type ProblemRead = z.infer<typeof ProblemReadSchema>;