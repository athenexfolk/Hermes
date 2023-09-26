const mongoose = require("mongoose")
const {saveImage} = require("../../services/image.service")
const ChangeImageOriginMiddelware = require("../../middleware/ImageOriginTransform.middelware")

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
chatSchema.post('init', ChangeImageOriginMiddelware("image"))
chatSchema.post('find', ChangeImageOriginMiddelware("image"))
chatSchema.post('save', ChangeImageOriginMiddelware("image"))



async function preSaveChatMiddleware(next) {

    await saveImage(this.image)
        .then(i=>this.image = i)
        .then(i=>next())
        .catch(()=>next());
}

module.exports = chatSchema
