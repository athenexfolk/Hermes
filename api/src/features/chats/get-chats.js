const HTTP_STATUS = require("../../core/value-object")
const ChatDao = require("../../dao/chat.dao")
const UserDao = require("../../dao/user.dao")

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

    await loadContactFromId(id)
        .then(mapModel)
        .then(LoadLastMessage)
        .then(i => res.json(i))
        .catch(i => res.status(HTTP_STATUS.NOT_FOUND).json(i));
}

function LoadLastMessage(contacts){
    return contacts.map(i=>{
        return{
            ...i,
            lastMassage : "Not Implemented"
        }
    });
}

async function mapModel(data) {
    return data.contacts.map(c => {
        return {
            chatID: c._id,
            type: c.type,
            chatName: c.chatName ?? c.members.find(i => i._id != data.sub)._id,
            image: c.image,
            color: c.color
        }
    })
}


/**
 * @param {string} id
 * @returns {Promise}
 */
async function loadContactFromId(id) {
    return await ChatDao.find().where('members._id').eq(id).then(contacts => {
        if (contacts.length <= 0)
            throw {
                error: "Value is null",
                msg: "Check your token"
            };
        return {
            sub: id,
            contacts
        };
    });
}



module.exports = contactEndpoint
