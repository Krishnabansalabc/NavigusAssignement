var mongoose = require('mongoose')

var userDetails = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: 1,
    },
    password: String,
    token: String,
    lastVisited: {
        type: String,
    }
})

module.exports = mongoose.model("User", userDetails);

