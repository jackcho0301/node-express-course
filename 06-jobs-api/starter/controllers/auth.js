const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    //password hashing is done in User model
    const user = await User.create({ ...req.body })

    const token = user.createJWT() //invoking instance method

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login
}