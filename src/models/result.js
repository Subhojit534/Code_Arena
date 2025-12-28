class Result {
    constructor(response) {
        console.log(JSON.stringify(response))
        this.status = response.status
        this.error = response.error
        if (response.results != null) {
            this.results = response.results.map((result) => new ExecResult(result))
        }
    }
}

class ExecResult {
    constructor(result) {
        this.testId = result.test_id
        this.ExecId = result.exec_result_id
        if (result.status != null) {
            this.status = new Status(result.status)
        }
    }
}


class Status {
    constructor(status) {
        this.message = status.message
        this.current_status = status.current_status
        this.stdout = status.stdout
        this.stderr = status.stderr
        this.completed_at = status.completed_at
    }
}

export default Result