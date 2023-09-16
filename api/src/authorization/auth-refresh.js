const HTTP_STATUS = require("../core/value-object");
const jwt = require("jsonwebtoken");
const { verifyToken, createTokenFromUserId } = require("../services/token.service");

/**
 * @typedef {Object} TokenResponse
 * @property {string} tokenType
 * @property {string} acessToken
 * @property {string} refreshToken
 * @property {number} expirein
 */

const jwtRefreshTokenValidate = async (req, res) => {
    const refreshToken = req.query.token;
    if (!refreshToken) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            error: "Can not get Token.",
            msg: "Attach token to authentication header."
        });
    }
    const tokeninfo = await verifyToken(refreshToken)
    if (!tokeninfo) {
        return res.status(HTTP_STATUS.TOKEN_EXPIRED_INVALID).json({
            error: "Token is not valid.",
            msg: "refresh your token."
        })
    } else {
        const token = await createTokenFromUserId(tokeninfo.id);
        res.json({
            tokenType: "Berer",
            acessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expirein: "Not implement."
        });
    }
}

module.exports = jwtRefreshTokenValidate
