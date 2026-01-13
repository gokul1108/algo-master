import { SubmitBatch } from "@/types/problems";
import axios from "axios";
import { NextResponse } from "next/server";
import { base64 } from "zod";
export function getJudge0LanguageId(language: string){
    const languageMap: Record<string, number> = {
        "PYTHON":71,
        "JAVASCRIPT":63,
        "JAVA":62,
        
    }
    return languageMap[language.toUpperCase()];
}

export async function submitBatch(submission:SubmitBatch) {
    console.log("Submitting to Judge0:");
    console.log(process.env.JUDGE0_API_URL)
    try{
        const response  = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false&`,{
        submission
    });
    
    console.log("Judge0 Response:", response.data);
    return response.data;

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error:(error as Error).message
        })

    }
    
    
}

export async function pollBatchResults(tokens: string[]) {
    const MAX_RETRIES = 10;
    const RETRY_INTERVAL = 2000; 
    let retries = 0;

    while(retries < MAX_RETRIES) {
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submission/batch`,
            {
                params:{
                    tokens:tokens.join(","),
                    base64_encoded:false,
                }
            }
        );
        retries++;
        console.log(data);
        const result = data.submission;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isAllDone = result.every((r :any)=>r.status.id !==1 && r.status.id !==2
        );
        if(isAllDone) return result;
        await sleep(RETRY_INTERVAL);

    }

}

export const sleep = (ms:number) => new Promise((resolve)=>setTimeout(resolve,ms));