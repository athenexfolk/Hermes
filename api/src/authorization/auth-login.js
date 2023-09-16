const HTTP_STATUS = require("../core/value-object");
const jwt = require("jsonwebtoken");
const { createTokenFromUserId } = require("../services/token.service");
const UserDao = require("../dao/user.dao");
const bcrypt = require("bcrypt")

/**
 * @typedef {Object} TokenResponse
 * @property {string} tokenType
 * @property {string} acessToken
 * @property {string} refreshToken
 * @property {number} expirein
 */

const loginEndpoint = async (req, res) => {
    const loginData = req.query;
    if (!loginData) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            error: "Empty username or password",
            msg: "Try to input again"
        });
    }
    authorize(loginData.username, loginData.password).then(async (isvalid) => {
        const token = await createTokenFromUserId(loginData.username);
        if (!isvalid) {
            throw Error("Authentication failed");
        } else {
            res.json({
                tokenType: "Berer",
                acessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expirein: "Not implement."
            });
        }
    }).catch(e =>
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            error: e.message,
            msg: "Try to input again"
        }))
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function authorize(username, password) {
    const user = await UserDao.findOne({ _id: username })
    if (!user)
        return false
    return await bcrypt.compare(password, user.passwordHash)
}


module.exports = loginEndpoint
