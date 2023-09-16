const HTTP_STATUS = require("../core/value-object");
const jwt = require("jsonwebtoken")
const { verifyToken } = require("../services/token.service");

/**
 * @typedef {Object} AuthorizationHeader
 * @property {string} authorization
 */


const authGuard = async (req, res, next) => {
    /** @type {AuthorizationHeader} */
    const header = req.headers;
    if (!header.authorization) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            error: "Can not get Token.",
            msg: "Attach token to authentication header."
        });
    }
    const tokeninfo = await verifyToken(header.authorization);
    if (!tokeninfo)
        return res.status(HTTP_STATUS.TOKEN_EXPIRED_INVALID).json({
            error: "Token is not valid.",
            msg: "refresh your token."
        });
    else {
        req.sub = tokeninfo.id;
        next();
    }
}


module.exports = authGuard;
