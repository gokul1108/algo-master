import { currentUserRole, getDBUserId } from "@/modules/auth/actions";
import { CreateProblemSchema } from "@/types/problems";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0";

export async function POST(req: NextRequest) {
    try {
        const userRole  = await currentUserRole();
        const userId = await getDBUserId();
        if(!userId.success || !userId.data){
            return NextResponse.json({ success: false, error: "UNAUTHORIZED" }, { status: 401 });
        }
        if(!userRole.success || userRole.data !== "ADMIN"){
            return NextResponse.json({ success: false, error: "FORBIDDEN" }, { status: 403 });
        }
        
        const body = await req.json();

        const data = CreateProblemSchema.parse(body);
        if(!data){
            return NextResponse.json({ success: false, error: "INVALID_DATA" }, { status: 400 });
        }
        console.log("Received problem data:", data);

        // Validate solutions by submitting to Judge0
        console.log("Validating solutions with Judge0........." + " "+ Object.entries(data.solution));
        for(const [language,code] of Object.entries(data.solution)){
            console.log("Validating solution for language:", code.language); 
            console.log("Code:", code);
            const languageId = getJudge0LanguageId(code.language);
            if(!languageId){
                return NextResponse.json({ success: false, error: "UNSUPPORTED_LANGUAGE", message: `Language ${language} is not supported for solutions.` }, { status: 400 });
            }
            console.log(data.testCases);
            const submission = data.testCases.map((input)=>({
                source_code:code.code,
                language_id:languageId,
                stdin:input.input,

            }));
            console.log("Prepared submissions for Judge0:", submission);

            //submit to judge0 to validate
            const submissionResult = await submitBatch(submission);

            console.log("Submission result from Judge0:", submissionResult);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tokens = submissionResult.map((res: any) => res.token);

            const results = await pollBatchResults(tokens);
            console.log(results);


        }

        const newProblem = await prisma.problem.create({
            data: {
                title: data.title,
                description: data.description,
                difficulty: data.difficulty,
                authorId: userId.data,
                tags: data.tags,
                constraints: data.constraints,
                hints: data.hints,
                editorial: data.editorial,
                examples: {
                    create:data.examples,
                },
                testcases: {
                    create:data.testCases,
                },
                codeSnippets: {
                    create:data.codeSnippets,
                },
                solutions:{
                    create: data.solution
                    
                }
            }
        });
        return NextResponse.json({ success: true, data: newProblem

        });
    }catch (error) {
        return NextResponse.json({ success: false, error: "SERVER_ERROR", message: (error as Error).message }, { status: 500 });
    }

}