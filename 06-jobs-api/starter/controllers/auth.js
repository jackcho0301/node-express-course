const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    //password hashing is done in User model
    const user = await User.create({ ...req.body })

    const token = user.createJWT() //invoking instance method

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    // res.send('login user')
    const {email, password} = req.body;
    
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    
    //compare password (using instance method)
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //user exists; create token
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})

}

module.exports = {
    register,
    login
}