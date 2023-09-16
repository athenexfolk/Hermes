const HTTP_STATUS = require("../../core/value-object")
const ChatDao = require("../../dao/chat.dao")

/**
 * @typedef {object} ContactData
 * @property {string} _id
 * @property {string} type
 * @property {string} chatName
 * @property {string} image
 * @property {string} color
 * @property {Date} joinedTime
 */

/* GET all contacts User*/
const contactEndpoint = async (req, res) => {
    const id = req.sub
    if (!id) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            error: "Value is null",
            msg: "Check your token"
        })
    }
    /** @type {ContactData[]} */
    const contacts = await loadContactFromId(id);
    if (!contacts) {
        res.status(HTTP_STATUS.OK).json({
            error: "No have contact",
            msg: "You can add your freinds"
        })
    } else {
        res.status(HTTP_STATUS.FOUND).json(contacts.map(c => {
            return {
                chatID: c._id,
                type: c.type,
                chatName: c.chatName || null,
                image: c.image,
                color: c.color,
                joinedTime: new Date(c.members[0].joinedTime)
            }
        }))
    }
}



/**
 *
 * @param {string} id
 * @returns {Promise}
 */
async function loadContactFromId(id) {
    const contacts = await ChatDao.find()
        .where('members._id').eq(id)
    if (contacts.length <= 0) return false
    return contacts
}



module.exports = contactEndpoint
