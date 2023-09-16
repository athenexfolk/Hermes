const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: String,
    displayname: String,
    passwordHash: String,
    avatar: String
}, { versionKey: false })

module.exports = userSchema
