const HTTP_STATUS = require("../../core/value-object");
const ChatDao = require("../../dao/chat.dao");
const UserDao = require("../../dao/user.dao");
const { sendWelcomeMessage } = require("../../hubs/message.tunnel");

/**
 * @typedef {Object} AddChatData
 * @property {"private" | "group"} type
 * @property {string} chatName
 * @property {string} image
 * @property {string} color
 * @property {string[]} to
 */
/**
 * @typedef {Object} AddChatResponse
 * @property {"private" | "group"} type
 * @property {string} chatID
 * @property {string} chatName
 * @property {string} image
 * @property {string} colour
 * @property {any} lastMessage
 */

function addChatEndpoint(req, res, next) {
    !req.body.to?.includes(req.sub) ? req.body.to.push(req.sub) : null;

    validateAddChatData(req)
        .then(fillterExistPrivateChat)
        .then(addChatToDatabase)
        .then(mapModel)
        .then(data =>{res.json(data);return data})
        .then(data=> sendWelcomeMessage(data.chatID,req.sub))
        .catch(next);
}

/**
 * @param {AddChatData} data
 */
async function validateAddChatData(req) {
    const data = req.body
    data.sub = req.sub;
    if (data.to.length <= 1)
        throw { error: "Not found resiver id." };

    else if (data.type != "group" && data.type != "private")
        throw { error: "Type not suppered. only for ['group', 'private']" };

    else if (data.type === "private" && !!data.chatName)
        throw { error: "Private chat can not have a name." };

    else if (data.type === "private" && !!data.image)
        throw { error: "Private chat not support for chat image." };

    else if (data.type === "group" && !data.chatName)
        throw { error: "Group chat is require chat name." };

    else if (data.type === "group" && !data.image)
        throw { error: "Group chat is require chat img." };

    else if (!await isUsersExist(data.to))
        throw { error: "User id dos not exist." };

    else return data;
}

async function mapModel(data) {
    return {
        type: data.type,
        chatID: data._id,
        chatName: data.type == "group"
            ? data.chatName
            : data.members?.filter(m => m._id != data.sub)[0]._id,
        image: data.image,
        color: data.color,
        lastMessage: [],
    }
}

/**
 * @param {AddChatData} data
 */
async function addChatToDatabase(data) {
    const chat = new ChatDao({
        type: data.type,
        members: data.to.map(i => {
            return { _id: i, joinedTime: Date.now() };
        }),
        color: data.color,
        image: data.image,
        chatName: data.chatName
    });
    return await chat.save();
}

/**
 * @param {string[]} users
 */
async function isUsersExist(users) {
    const data = await UserDao.count({
        $or: users.map(i => {
            return { _id: i }
        })
    });
    return data === users.length;
}

/**
 *
 * @param {AddChatData} data
 */
async function fillterExistPrivateChat(data) {
    const chat = await ChatDao.aggregate([{
        '$match': {
            '$and': [
                { 'members': { '$size': 2 } },
                { 'members._id': { $all: data.to } }
            ]
        }
    },
    {
        '$project': { '_id': 1 }
    }]);

    console.log(chat);;

    if (chat.length == 0)
        return data;
    else throw {
        err: "Chat already exists",
        chatId: chat[0]._id
    }
}

module.exports = addChatEndpoint;
