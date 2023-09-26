const mongoose = require("mongoose")
const {saveImage} = require("../../services/image.service")
const ChangeImageOriginMiddelware = require("../../middleware/ImageOriginTransform.middelware")

const userSchema = mongoose.Schema({
    _id: String,
    displayname: String,
    passwordHash: String,
    avatar: String
}, { versionKey: false })

userSchema.pre('save', preSaveChatMiddleware)
userSchema.post('init', ChangeImageOriginMiddelware("avatar"))
userSchema.post('save', ChangeImageOriginMiddelware("avatar"))


async function preSaveChatMiddleware(next) {
    console.log(this.avatar);
    await saveImage(this.avatar)
        .then(i=>this.avatar = i)
        .then(i=>next())
        .catch(()=>next());
}

module.exports = userSchema
