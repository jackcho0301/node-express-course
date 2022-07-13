const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            next(error); //pass to next middleware
        }
    }
}

module.exports = asyncWrapper