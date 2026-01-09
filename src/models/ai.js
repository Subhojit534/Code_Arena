class AISummary {
    constructor(summary) {
        this.suggestion = summary.suggestion
        this.timeComplexity = summary.time_complexity
        this.spaceComplexity = summary.space_complexity
        // this.suggestedCode = summary.suggested_code
    }
}

class AIPayload {
    constructor({
        question,
        code,
        language,
        // avgExecutionTime,
        message
    }) {
        this.code = code
        this.language = language
        this.question = question
        // this.avgExecutionTime = avgExecutionTime
        this.message = message
    }

    toJson() {
        return {
            "code": this.code,
            "language": this.language,
            // "avg_exec_time": this.avgExecutionTime,
            "message": this.message,
            "status": this.status,
        }
    }
}


class AICodeCorrectSummary{
    constructor(outputSummary){
        this.correctedCode = outputSummary.corrected_code
        this.explanation = outputSummary.explanation
    }
}

class AICodeCorrectPayload{
    constructor({
        code,
        question,
        output,
        error
    }){
        this.code = code
        this.question = question
        this.output = output
        this.error = error
    }

    toJson() {
        return {
            "code": this.code,
            "question": this.question,
            "output": this.output,
            "error": this.error,
        }
    }
}


export {
    AIPayload,
    AISummary,
    AICodeCorrectPayload,
    AICodeCorrectSummary
}
