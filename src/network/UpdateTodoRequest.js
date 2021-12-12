class UpdateTodoRequest {
    id = null
    content = null
    is_success = null

    constructor(expressRequest) {
        const { id } = expressRequest.params
        const { content, is_success } = expressRequest.body
        this.id = id
        this.content = content
        this.is_success = is_success
        this.validate()
    }

    validate() {
        if (this.id < 0 || isNaN(this.id) === true) {
            throw Error("올바른 id를 입력해주세요!")
        }
        if (!this.content || this.content.length < 5 || this.content.length > 20) {
            throw Error("올바른 내용을 입력해주세요!")
        }
        if (typeof this.is_success != "boolean") {
            throw Error("불리언 타입만을 입력해주세요!")
        }
    }
}

module.exports = UpdateTodoRequest
