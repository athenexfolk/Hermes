const mongoose = require("mongoose")
const saveImage = require("../../services/image.service")

const userSchema = mongoose.Schema({
    _id: String,
    displayname: String,
    passwordHash: String,
    avatar: String
}, { versionKey: false })

userSchema.pre('save', preSaveChatMiddleware)

async function preSaveChatMiddleware(next) {
    await saveImage(this.avatar)
        .then(i=>this.avatar = i)
        .then(i=>next())
        .catch(()=>next());
}

module.exports = userSchema
