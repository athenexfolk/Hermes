const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    type: String,
    members: [{
        _id: String,
        joinedTime: Date
    }],
    color: String,
    image: String
}, { versionKey: false })

module.exports = chatSchema
