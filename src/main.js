const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3714

// get the client
const mysql = require("mysql2/promise")
const CreateTodoRequest = require("./network/CreateTodoRequest")
const CreateTodoResponse = require("./network/CreateTodoResponse")
const FindTodoResponse = require("./network/FindTodoResponse")
const AsyncWrapper = require("./common/AsyncWrapper")
const config = require("./common/config")
const ErrorHandler = require("./common/ErrorHandler")
const ResponseHandler = require("./common/ResponseHandler")
const UpdateTodoRequest = require("./network/UpdateTodoRequest")
const UpdateTodoResponse = require("./network/UpdateTodoResponse")
const DeleteTodoRequest = require("./network/DeleteTodoRequest")
const DeleteTodoResponse = require("./network/DeleteTodoResponse")

initExpress(app)

// READ response 객체  - FindTodoResponse
app.get("/todos", AsyncWrapper.wrap(findTodo))
async function findTodo(req, res, next) {
    const connection = await mysql.createConnection(config.mysql)
    const queryResult = await connection.execute("Select * FROM todo ")
    const response = new FindTodoResponse(queryResult)
    res.output = response
    next()
}

// CREATE  createTodoRequest -- createTodoResponse
app.post("/todos", async (req, res) => {
    const request = new CreateTodoRequest(req)
    let response = null
    try {
        request.validate()
        const { contents } = request
        const connection = await mysql.createConnection(config.mysql)
        await connection.execute("INSERT INTO todo (content) VALUES (?)", [contents])
        response = new CreateTodoResponse(200, { result: true }, res)
    } catch (error) {
        response = new CreateTodoResponse(400, { result: false, message: error.message }, res)
    } finally {
        response.send()
    }
})

// CREATE  createTodoRequest -- createTodoResponse
// app.post("/todos", AsyncWrapper.wrap(createTodo))
// async function createTodo(req, res, next) {
//     const request = new CreateTodoRequest(req)
//     const { content } = request
//     //service Start
//     const connection = await mysql.createConnection(config.mysql)
//     await connection.execute("INSERT INTO todo (content) VALUES (?)", [content])
// }

// UPDATE request, response 둘다
app.put("/todos/:id", AsyncWrapper.wrap(updateTodo))
async function updateTodo(req, res, next) {
    const request = new UpdateTodoRequest(req)
    const { id, content, is_success } = request
    //Service Start
    const connection = await mysql.createConnection(config.mysql)
    await connection.execute("UPDATE todo SET content = ?,is_success=? Where id =?", [content, is_success, id])
    res.output = new UpdateTodoResponse(true)
    next()
}

// DELETE request, response 둘다
app.delete("/todos/:id", AsyncWrapper.wrap(deleteTodo))
async function deleteTodo(req, res, next) {
    const request = new DeleteTodoRequest(req)
    const { id } = request
    const connection = await mysql.createConnection(config.mysql)
    await connection.execute("DELETE FROM todo WHERE id=?", [id])
    res.output = new DeleteTodoResponse(true)
    next()
}

app.use(ResponseHandler.handle) // 미들웨어 등록
app.use(ErrorHandler.handle) // 미들웨어 등록

app.listen(PORT, () => console.log(`Example app listening at http://localhost:3714`))

function initExpress(app) {
    app.use(express.json()) // json으로 들어온 요청을 parsing 해준다.
    app.use(cors()) // cors 설정
}
