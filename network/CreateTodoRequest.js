class CreateTodoRequest {
    contents = ""
    constructor(express) {
        const { contents } = express.body
        this.contents = contents
    }
    validate() {
        if (this.contents.length > 200) {
            throw new Error("contents 길이를 넘었습니다")
        }
    }
}

module.exports = CreateTodoRequest
