const HTTP_STATUS = require("../../core/value-object");
const ChatDao = require("../../dao/chat.dao");
const MessageDao = require("../../dao/message.dao");

const HISTORY_SIZE = 5;

async function getChatHistory(req, res) {
    if (!req.params.ref)
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            error:"Invalid reference",
            msg:"Param 'ref' should not be empty. ref can be chat id or message id",
        })
    else getChatHistoryFromRef(req.params.ref).then(h => {
        res.json(h.map(i => {
            return {
                chatId: i.chatID,
                messageId: i._id,
                sender: i.senderID,
                timestamp: i.sendTime,
                chatContent: i.content
            }
        }).reverse());
    }).catch(e => {
        res.json({ error: e.message })
    });
}

async function getChatHistoryFromRef(refId) {
    const ref = await loadRefFromMessageId(refId);
    const messageHistories = await MessageDao.find({})
        .where("chatID").eq(ref?.chatId ?? refId)
        .where("sendTime").lt(ref?.sendTime ?? Date.now())
        .sort("-sendTime")
        .limit(2)
    if (messageHistories.length == 0)
        throw new Error("End of message history");
    return messageHistories;
}

async function loadRefFromMessageId(messageID) {
    return await MessageDao
        .findOne({ _id: messageID })
        .select("sendTime")
        .select("chatID");
}

module.exports = getChatHistory;
