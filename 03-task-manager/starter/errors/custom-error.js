class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message) //invoke constructor of parent class
        this.statusCode = statusCode //our own property
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError (msg, statusCode)
}

module.exports = {
    createCustomError,
    CustomAPIError
}