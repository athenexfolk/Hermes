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
const contactEndpoint = async (req, res, next) => {
    const id = req.sub
    console.assert(!!id, "Invalid user id")

    await loadContactFromDb(id)
        .then(fillterEmptyList)
        .then(mapModel)
        .then(i => res.json(i))
        .catch(next);
}

async function fillterEmptyList(data) {
    if (Array.isArray(data) && data.length == 0)
        throw new {
            error: "Chat not found",
            msg: ""
        }
    else return data
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
            color: c.color,
            lastestMessage: {
                chatId: c.chatId,
                messageId: c.lastestMessage[0]._id,
                sender: c.lastestMessage[0].senderID,
                timestamp: c.lastestMessage[0].sendTime,
                chatContent: c.lastestMessage[0].content
            }
        }
    })
}

module.exports = contactEndpoint
