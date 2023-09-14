const HTTP_STATUS = require("../core/value-object");
require("dotenv").config()
const jwt = require("jsonwebtoken")

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
    await verifyToken(header.authorization).then((isvalid) => {
        if (!isvalid) {
            return res.status(HTTP_STATUS.TOKEN_EXPIRED_INVALID).json({
                error: "Token is not valid.",
                msg: "refresh your token."
            })
        } else {
            next();
        }
    }).catch(err => {
        throw new Error(err)
    })
}

/**
 *
 * @param {string} requestheader
 *  @returns {Promise}
 */

const verifyToken = async (requestheader) => {
    //TODO: verify jwt
    return new Promise((resolve, reject) => {
        console.warn('bypassing token validation : ' + requestheader);
        const token = requestheader.replace("Bearer ", "")

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}


module.exports = authGuard;
