class FindTodoResponse {
    result = [TodoDto]

    constructor(queryResult) {
        const rows = queryResult[0]
        this.result = rows.map((row) => new TodoDto(row))
    }
}
class TodoDto {
    id = 0
    content = ""
    create_at = null // 날짜
    update_at = null // 날짜

    constructor(row) {
        const { id, content, create_at, update_at } = row
        this.id = id
        this.content = content
        this.create_at = create_at
        this.update_at = update_at
    }
}

module.exports = FindTodoResponse
