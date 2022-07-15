const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') //for hashing
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
})

//mongoose documentation: 'pre middleware functions are executed one after another, when each middleware calls next'
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) //'this' refers to the document
    next()
} )

//instance method
UserSchema.methods.getName = function () {
    return this.name
}

//instance method
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, 'jwtSecret', {expiresIn: '30d'})
}

module.exports = mongoose.model('User', UserSchema)