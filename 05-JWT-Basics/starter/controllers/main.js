//big picture:

//check username, password in post(login) request
//if exist, create new JWT
//send back to frontend

//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const login = async = (req, res) => {
    const {username, password} = req.body
    
    // check empty username / password
        //option 1: use mongo's validation
        //option 2: Joi (package)
        //option 3: check them here and throw custom error
    
    if(!username || !password) {
        throw new CustomAPIError('Please provide emial and password', 400 )  
    }

    //dummy id (because this project does not have DB)
    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'}) //1.payload 2.JWT secret 3.options

    res.send({msg: 'user created', token})
}

//this is where we see authorized data
const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization //the request header contains token (from frontend)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1] //['Bearer', 'gfaksjdhga........']

    console.log(token);
    //verify token:
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})


    } catch(error) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }

    
}

module.exports = {
    login, 
    dashboard
} 