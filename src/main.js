const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3714

// get the client
const mysql = require("mysql2/promise")
const CreateTodoRequest = require("../network/CreateTodoRequest")
const CreateTodoResponse = require("../network/CreateTodoResponse")
const FindTodoResponse = require("../network/FindTodoResponse")

const connectionInfo = {}

initExpress(app)

// READ response 객체  - FindTodoResponse
app.get("/todos", async (req, res) => {
    let response = null
    try {
        const connection = await mysql.createConnection(connectionInfo)
        const body = await connection.execute("Select * FROM todo ")
        response = new FindTodoResponse(200, body, res)
    } catch (error) {
        response = new FindTodoResponse(400, "오류가 납니다", res)
    } finally {
        response.send()
    }
})

// CREATE  createTodoRequest -- createTodoResponse
app.post("/todos", async (req, res) => {
    const request = new CreateTodoRequest(req)
    let response = null
    try {
        request.validate()
        const { contents } = request
        const connection = await mysql.createConnection(connectionInfo)
        await connection.execute("INSERT INTO todo (content) VALUES (?)", [contents])
        response = new CreateTodoResponse(200, { result: true }, res)
    } catch (error) {
        response = new CreateTodoResponse(400, { result: false, message: error.message }, res)
    } finally {
        response.send()
    }
})

// UPDATE
app.put("/todos", (request, response) => {
    const responseBody = "PUT /todos"
    response.status(200)
    response.json(responseBody)
})

// DELETE
app.delete("/todos", (request, response) => {
    const responseBody = "DELETE /todos"
    response.status(200)
    response.json(responseBody)
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:3714`))

function initExpress(app) {
    app.use(express.json()) // json으로 들어온 요청을 parsing 해준다.
    app.use(cors()) // cors 설정
}
