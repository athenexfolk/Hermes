const { verifyToken } = require('../services/token.service');

const authGuard = async (socket, next) => {
    const token = socket.handshake.auth.token
        ?? socket.handshake.headers.Authorization
        ?? socket.handshake.headers.authorization

    if (!token)
        next(new Error("Attach your token to connect package"));
    else {
        const info = await verifyToken(token);
        if (!!info?.id) {
            socket.sub = info.id
            next();
        } else {
            next(new Error("Unauthorized"));
        }
    }
}

module.exports = authGuard;
