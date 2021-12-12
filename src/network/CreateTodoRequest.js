class CreateTodoRequest {
    content = ""
    constructor(express) {
        const { content } = express.body
        this.contents = content
        this.validate()
    }
    validate() {
        if (this.contents.length > 20) {
            throw new Error("contents 길이를 넘었습니다")
        }
    }
}

module.exports = CreateTodoRequest
