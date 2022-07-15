//big picture:

//check username, password in post(login) request
//if exist, create new JWT
//send back to frontend

//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors')

const login = async = (req, res) => {
    const { username, password } = req.body

    // check empty username / password
    //option 1: use mongo's validation
    //option 2: Joi (package)
    //option 3: check them here and throw custom error

    if (!username || !password) {
        throw new BadRequestError('Please provide emial and password')
    }

    //dummy id (because this project does not have DB)
    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' }) //1.payload 2.JWT secret 3.options

    res.send({ msg: 'user created', token })
}

//this is where we see authorized data
const dashboard = async (req, res) => {

    console.log(req.user) //req.user contains id and username, passed on from authenticationMiddleware()

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })


}

module.exports = {
    login,
    dashboard
} 