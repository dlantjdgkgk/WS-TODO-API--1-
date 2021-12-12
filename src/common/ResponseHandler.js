const ResponseHandler = {
    handle(req, res, next) {
        res.status(200)
        res.json(res.output)
    },
}

module.exports = ResponseHandler
