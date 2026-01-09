import {
    GoogleGenerativeAI
} from "@google/generative-ai";
import {
    AISummary,
    AICodeCorrectSummary,
} from "models/ai";

class CodeReview {

    MODEL = 'gemini-2.5-flash';
    APIKEY =
        import.meta.env.VITE_GEMINI_API_KEY


    constructor() {
        this.genAi = new GoogleGenerativeAI(this.APIKEY)
        this.model = this.genAi.getGenerativeModel({
            model: this.MODEL
        })
    }

    async getReview(aiPayload) {
        const prompt = `Analyze the language, code, message returned from a code execution backend, analyze and assess the code for suggestion, errors and key improvements.
        Remember these are university student, do not suggest some highly complex code, if they did right, only suggest things that would be appropriate for an engineering student.
        Provide the output ONLY as a valid JSON object. Do not include any other text, comments, or explanations. 
        Use this JSON schema:
        "suggestion": "string as suggestive improvements that can be done on code and say only 'none' if no improvements required"
        "time_complexity": "string as O(1)/O(n)/O(n^2)...."
        "space_complexity": "string as O(1)/O(n)/O(n^2)...."
        ---
        **Input Data for Analysis:**
        ${JSON.stringify(aiPayload)}
        ---
        `
        const textPart = {
            text: prompt,

        }

        try {
            const result = await this.model.generateContent([textPart])
            const response = result.response
            const rawJson = response.text()
            if (!rawJson) {
                return new AISummary({
                    "suggestion": "none",
                    "time_complexity": "N/A",
                    "space_complexity": "N/A",
                })
            }

            const cleanedJson = rawJson.replace(/```json\n|```/g, '').trim()
            const parsedJson = JSON.parse(cleanedJson)

            return new AISummary(parsedJson)

        } catch (err) {
            console.log(err)
        }
        return new AISummary({
            "suggestion": "N/A",
            "time_complexity": "N/A",
            "space_complexity": "N/A",
        })
    }

    async codeCorrect(aiOutputPayload){
          const prompt = `You are a code correcting AI, here code will provided to you in json payload, analyze and assess the code output or error from our backend compiler and make adequate adjustments.
          Remember these are university student, do not suggest some highly complex code, if they did right, only suggest things that would be appropriate for an engineering student.
          Provide the output only as valid JSON object. Do not include any text, explanation or comments in code or outside, make everything concise in "explantions" part.
          Use this JSON schema:
          "corrected_code": "string"
          "explanation": "string make it breif and concise"
          ---
          **Input Data for Analysis:**
          ${JSON.stringify(aiOutputPayload)}
          `

        const textPart = {
            text: prompt,
        }

        try{
            const result = await this.model.generateContent([textPart])
            const response = result.response
            const rawJson = response.text()

            if(!rawJson){
                return new AICodeCorrectSummary({
                     "corrected_code": "",
                     "explanation": ""
                })
            }

            const cleanedJson = rawjson.replace(/```json\n|```/g, '').trim()
            const parseJson = JSON.parse(cleanedJson)
            
            return new AICodeCorrectSummary(parseJson)
        }catch(err){
             console.log(err)
        }
        return new AICodeCorrectSummary({
            "corrected_code": "",
            "explanation": "",
        })
    }
}

export default CodeReview
