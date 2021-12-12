class DeleteTodoRequest {
    id = null

    constructor(expressRequest) {
        const { id } = expressRequest.params
        this.id = id
        this.validate()
    }

    validate() {
        if (this.id < 0 || isNaN(this.id) === true) {
            throw Error("올바른 id를 입력해주세요!")
        }
    }
}

module.exports = DeleteTodoRequest
