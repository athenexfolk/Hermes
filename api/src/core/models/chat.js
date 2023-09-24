const mongoose = require("mongoose")
const saveImage = require("../../services/image.service")

const chatSchema = mongoose.Schema({
    type: String,
    members: [{
        _id: String,
        joinedTime: Date
    }],
    chatName: String,
    color: String,
    image: String
}, { versionKey: false })

chatSchema.pre('save', preSaveChatMiddleware)

async function preSaveChatMiddleware(next) {

    await saveImage(this.image)
        .then(i=>this.image = i)
        .then(i=>next())
        .catch(()=>next());
}

module.exports = chatSchema
