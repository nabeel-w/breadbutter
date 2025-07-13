import { gemini } from "../lib/gemini";

export const createEmbedding = async (text: string) => {
    try {
        const res = await gemini.models.embedContent({
            model: 'gemini-embedding-exp-03-07',
            contents: text,
            config: {
                taskType: "CLUSTERING"
            }
        })
        
        if (!res || !res.embeddings || res.embeddings.length === 0) {
            throw new Error("No embeddings returned from Gemini");
        }
        return res.embeddings;
    } catch (error) {
        console.error("Error creating embedding:", error);
        throw new Error("Failed to create embedding");
        
    }
}