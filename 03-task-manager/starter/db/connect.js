const mongoose = require('mongoose')


//effectively, this is returning Promise
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB


