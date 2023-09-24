const ChatDao = require("../dao/chat.dao");
const MessageDao = require("../dao/message.dao");
const authGuard = require("./auth.guard");

// go:online
// gone:offline
// onlines
// error

var nsp;

const NAMESPACE = "chat";
const AUTH_GUARD = authGuard;
const ON_CONNECTION = onConnection;

function onConnection(socket) {
    const sub = socket.sub;
    goOnline(socket);
    socket.on("disconnect", socket => goOfline(socket, sub));
}

async function getAllOnlineUsers(socket) {
    const onlineUser = new Set();
    for (let [key, val] of nsp.adapter.sids) {
        const v = Array.from(val).filter(i => i != key);
        onlineUser.add(...v)
    }
    console.log(onlineUser);
    return Array.from(onlineUser);
}

function goOnline(socket) {
    console.log(socket.sub, " is online");
    getAllOnlineUsers(socket)
        .then(onlineUsers => {
            socket.emit("onlines", onlineUsers);
            onlineUsers.forEach(r => {
                nsp.to(r).emit("go:online", socket.sub);
            })
        })
        .catch(errorHandeler(socket, "Can not get online users."));
}

function goOfline(socket, sub) {
    console.assert(!!sub, "You should login with token.")
    console.log(sub, " is ofonline");
    getAllOnlineUsers(socket)
        .then(o => o.includes(sub) ? [] : o)
        .then(onlineUsers => {
            onlineUsers.forEach(r => {
                nsp.to(r).emit("gone:offline", sub);
            })
        })
}

function errorHandeler(socket, message) {
    return (e) => socket.emit("error", message, e.message, e.stack)
}

function addOnlineStatus(io) {
    nsp = io.of(NAMESPACE);
    nsp.use(AUTH_GUARD);
    nsp.on('connection', ON_CONNECTION);
}

module.exports = addOnlineStatus;
