const { ObjectId } = require("bson")
const mongoose = require("mongoose")
const saveImage = require("../../services/image.service")

const messageSchema = mongoose.Schema({
    senderID: String,
    content: {},
    sendTime: Date,
    chatID: ObjectId
}, { versionKey: false })

messageSchema.pre('save', preSaveChatMiddleware)

async function preSaveChatMiddleware(next) {
    await saveImage(this.content.value)
        .then(i=>this.content.value = i)
        .then(i=>next())
        .catch(()=>next());
}

module.exports = messageSchema
