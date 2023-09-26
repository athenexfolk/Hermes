const { ObjectId } = require("bson")
const mongoose = require("mongoose")
const {saveImage, changeImageOrigin} = require("../../services/image.service")
const ChangeImageOriginMiddelware = require("../../middleware/ImageOriginTransform.middelware")

const messageSchema = mongoose.Schema({
    senderID: String,
    content: Object,
    sendTime: Date,
    chatID: ObjectId
}, { versionKey: false })

messageSchema.pre('save', preSaveChatMiddleware)
messageSchema.post('init', ChangeImageOriginMiddelware("content.value"))
messageSchema.post('save', ChangeImageOriginMiddelware("content.value"))

async function preSaveChatMiddleware(next) {
    await saveImage(this.content.value)
        .then(i => this.content.value = i)
        .then(i => next())
        .catch(() => next());
}

module.exports = messageSchema
