const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({msg : err})
}

module.exports = errorHandlerMiddleware


//err was passed from asyncWrapper's next(err)
//asyncWrapper passed it to next middleware