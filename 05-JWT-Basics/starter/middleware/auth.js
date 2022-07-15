const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')


const authenticationMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization //the request header contains token (from frontend)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
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
        throw new CustomAPIError('Not authorized to access this route', 401)
    }

}

module.exports = authenticationMiddleware