const { verifyToken } = require('../services/token.service');

const authGuard = async (socket, next) => {
    const info = await verifyToken(socket.handshake.auth.token);
    if (!!info?.id) {
        socket.sub = info.id
        next();
    } else {
        next(new Error("Unauthorized"));
    }
}

module.exports = authGuard;
