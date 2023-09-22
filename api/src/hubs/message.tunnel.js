const ChatDao = require("../dao/chat.dao");
const MessageDao = require("../dao/message.dao");
const authGuard = require("./auth.guard");

/**
* @typedef {Object} MessageSenderObject
* @property {string} chatId
* @property {Object} chatContent
*/
/**
* @typedef {Object} MessageBoadcastObject
* @property {string} chatId
* @property {string} sender
* @property {Date} timestamp
* @property {Object} chatContent
*/
/**
* @typedef {Object} messageDbSchema
* @property {string} chatID
* @property {string} senderID
* @property {Date} sendTime
* @property {Object} content
*/
/**
* @typedef {Object} SavedMessageResult
* @property {Array<String>} chatMembers
* @property {Object} result
*/

var nsp;

const NAMESPACE = "chat";
const AUTH_GUARD = authGuard;
const ON_CONNECTION = onConnection;

function onConnection(socket) {
    joinAuthRoom(socket);
    addOnMessageHandler(socket);
}

function addOnMessageHandler(socket) {
    socket.on("message:send", async context => {
        if(!context.chatContent || !context.chatId)
            return saveMessageErrorHandeler(socket)(new Error("Couldn't send message [invalid chat id or empty message]"));
        const message = {
            senderID: socket.sub,
            content: context.chatContent,
            chatID: context.chatId,
            sendTime: Date.now()
        };
        saveMessageToDb(message)
            .then(result => {
                message.messageID = result.result._id;
                sendMessageTo(result.chatMembers, message);
            })
            .catch(saveMessageErrorHandeler(socket));
    });
};

function saveMessageErrorHandeler(socket) {
    return !!socket
        ? (e) => socket.emit("message", e.message)
        : console.error;
}

function joinAuthRoom(socket) {
    socket.join(socket.sub);
    console.debug(`'${socket.id}' connected to room '${socket.sub}'`);
}


/**
 * @param {messageDbSchema} context context to save on database
 * @returns {Promise<SavedMessageResult>} list of chat members
 */
function saveMessageToDb(context) {
    return new Promise(async (resolve, reject) => {
        const chatmembers = (await ChatDao.findOne(
            { _id: context.chatID },
            { "members._id": 1, "_id": 0 })
        ).members?.map(m => m.id) ?? [];

        if (chatmembers.lenght == 0)
            reject(new Error("Invalid Chat ID"));

        if (chatmembers.indexOf(context.senderID) < 0)
            reject(new Error("Permission denied"));
            
        else {
            const msg = new MessageDao(context);
            await msg.save()
                .then(r => resolve(/** @type {SavedMessageResult} */{
                    chatMembers: chatmembers,
                    result: r
                }))
                .catch(e => reject(e));
        };
    });
}

/**
 *
 * @param {Array<string>} dests - list of chat members's id
 * @param {Object} message - message object
 */
function sendMessageTo(dests, message) {
    if (!Array.isArray(dests))
        dests = [dests];

    dests.forEach(dest => {
        nsp.to(dest).emit("message", message);
    });
}


function addOnMessage(io) {
    nsp = io.of(NAMESPACE);
    nsp.use(AUTH_GUARD);
    nsp.on('connection', ON_CONNECTION);
}

module.exports = addOnMessage;
