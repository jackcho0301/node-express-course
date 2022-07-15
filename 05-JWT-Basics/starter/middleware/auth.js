const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors')


const authenticationMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization //the request header contains token (from frontend)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1] //['Bearer', 'gfaksjdhga........']



    //verify token:
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)

        const {id, username} = decoded
        req.user = {id, username}
        next() //pass to next middleware
        
    } catch(error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

}

module.exports = authenticationMiddleware