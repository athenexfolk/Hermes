const HTTP_STATUS = require("../../core/value-object")
const ChatDao = require("../../dao/chat.dao")
const MessageDao = require("../../dao/message.dao")
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

    await loadContactFromDb(id)
        // .then(console.log)
        .then(mapModel)
        .then(i => res.json(i))
        .catch(i => res.status(HTTP_STATUS.NOT_FOUND).json(i));
}

async function loadContactFromDb(chatId) {
    console.assert(!!chatId, "chatId is null");

    return await ChatDao.aggregate([
        {
            '$match': {
                'members._id': chatId
            }
        },
        {
            '$lookup': {
                'from': 'users',
                'localField': 'members._id',
                'foreignField': '_id',
                'pipeline': [
                    {
                        '$match': {
                            '_id': {
                                '$ne': chatId
                            }
                        }
                    }
                ],
                'as': 'userinfo'
            }
        },
        {
            '$lookup': {
                'from': 'messages',
                'localField': '_id',
                'foreignField': 'chatID',
                'pipeline': [
                    {
                        '$sort': {
                            'sendTime': -1
                        }
                    },
                    {
                        '$group': {
                            '_id': '$chatID',
                            'latestMessage': {
                                '$first': '$$ROOT'
                            }
                        }
                    }
                ],
                'as': 'lastestMessage'
            }
        },
        {
            '$project': {
                '_id': 0,
                'chatId': '$_id',
                'type': '$type',
                'chatName': '$chatName',
                'avatar': '$image',
                'color': '$color',
                'members': 1,
                'userInfo': "$userinfo",
                'lastestMessage': '$lastestMessage.latestMessage'
            }
        }
    ]);
}

async function mapModel(data) {
    return data.map(c => {
        return {
            chatID: c.chatId,
            type: c.type,
            chatName: c.chatName ?? c.userInfo[0].displayname ?? null,
            image: c.avatar ?? c.userInfo[0].avatar ?? null,
            color: c.color
        }
    })
}

module.exports = contactEndpoint
