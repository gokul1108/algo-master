import { currentUserRole, getDBUserId } from "@/modules/auth/actions";
import { CreateProblemSchema } from "@/types/problems";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

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