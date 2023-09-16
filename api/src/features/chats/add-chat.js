const HTTP_STATUS = require("../../core/value-object");
const ChatDao = require("../../dao/chat.dao");
const UserDao = require("../../dao/user.dao");

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

async function addChatEndpoint(req, res){
    !req.body.to.includes(req.sub) ? req.body.to.push(req.sub) : null;
    addChatToDatabase(req.body) .then(data=>{
        res.json({
            type: data.type,
            chatID: data._id,
            chatName: data.type == "group"
                ? data.chatName
                : data.members?.filter(m => m._id != req.sub)[0]._id,
            image: data.image,
            color : data.color,
            lastMessage: [],
        })
    }).catch(e=>res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: e.message
    }));
}

/**
 * @param {AddChatData} data
 */
async function validateAddChatData(data){
    if (data.to.length <= 1)
        throw new Error("Not found resiver id.");

    else if (data.type != "group" && data.type != "private")
        throw new Error("Type not suppered.");

    else if (data.type === "private" && !!data.chatName)
        throw new Error("Private chat can not have a name.");

    else if (data.type === "group" && !data.chatName)
        throw new Error("Group chat is require chat name.");

    else if (data.type === "group" && !data.image)
        throw new Error("Group chat is require chat img.");

    else if (!await isUsersExist(data.to))
        throw new Error("User id dos not exist.");

    else return data;
}

/**
 *
 * @param {AddChatData} data
 */
async function addChatToDatabase(data){
    const validData = await validateAddChatData(data);
    const chat = new ChatDao({
        type: validData.type,
        members: validData.to.map(i=>{
            return {_id:i, joinedTime: Date.now()};
        }),
        color: validData.color,
        image: validData.image,
        chatName: validData.chatName
    });
    return await chat.save();
}

/**
 *
 * @param {string[]} users
 */
async function isUsersExist(users){
    const data = await UserDao.count({
        $or:users.map(i=>{
            return {_id:i}
        })
    });
    return data === users.length;
}

module.exports = addChatEndpoint;
