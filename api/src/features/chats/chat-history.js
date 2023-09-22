const mongo = require("mongoose");
const HTTP_STATUS = require("../../core/value-object");
const ChatDao = require("../../dao/chat.dao");
const MessageDao = require("../../dao/message.dao");

Date.MIN_VALUE = new Date(-8640000000000000);
Date.MAX_VALUE = new Date(8640000000000000);
const HISTORY_SIZE = 5;

async function getChatHistory(req, res) {
    if (!req.params.ref)
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            error: "Invalid reference",
            msg: "Param 'ref' should not be empty. ref can be chat id or message id",
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
    const ref = await loadRefFromId(refId);
    // const joinTime = ref.map(i=>i.chat.find(i=>i._id=="saksit"))[0]?.joinedTime ?? Date.MIN_VALUE;

    console.log(ref);

    const messageHistories = await MessageDao.find({})
        .where("chatID").eq(ref?.chatID ?? refId)
        .where("sendTime").lt(ref?.sendTime ?? Date.MAX_VALUE)
        .where("sendTime").gt(ref.chat.find(i=>i._id=="saksit")[0]?.joinedTime ?? Date.MIN_VALUE)
        .sort("-sendTime")
        .limit(10)
    if (messageHistories.length == 0)
        throw new Error("End of message history");
    return messageHistories;
}

async function loadRefFromId(refID) {
    console.assert(!!refID, "Message ID must be provided")

    // ref from chat
    const cref = await ChatDao.find()
        .where("_id").eq(refID)
        .select("members");

    return cref.length > 0
        ? cref[0]
        // ref from message
        : MessageDao.aggregate([
            {
                '$match': {
                    '_id': new mongo.Types.ObjectId(refID)
                }
            }, {
                '$lookup': {
                    'from': 'chats',
                    'localField': 'chatID',
                    'foreignField': '_id',
                    'pipeline': [
                        {
                            '$project': {
                                'member': '$members',
                                '_id': 0
                            }
                        }
                    ],
                    'as': 'result'
                }
            }, {
                '$unwind': '$result'
            }, {
                '$project': {
                    '_id': 0,
                    'chat': '$result.member',
                    'sendTime': 1,
                    'chatID': 1
                }
            }
        ]).then(i=>{
            if (i.length == 0 )
                throw { error: "Empty message" };
            else return i[0];
        })
}

module.exports = getChatHistory;
