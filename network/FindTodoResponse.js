class FindTodoResponse {
    status = undefined
    body = null
    response = null

    constructor(status, body, expressResponse) {
        this.status = status
        this.body = body
        this.response = expressResponse
    }

    send() {
        this.response.status(this.status)
        this.response.json(this.body)
    }
}

module.exports = FindTodoResponse
