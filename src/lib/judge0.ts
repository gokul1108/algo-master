import { SubmitBatch } from "@/types/problems";
import axios from "axios";
export function getJudge0LanguageId(language: string){
    const languageMap: Record<string, number> = {
        "PYTHON":71,
        "JAVASCRIPT":63,
        "JAVA":62,
        
    }
    return languageMap[language.toUpperCase()];
}

export async function submitBatch(submission:SubmitBatch) {
    const response  = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false&`,{
        submission


    });
    console.log("Judge0 Response:", response.data);
    return response.data;
}