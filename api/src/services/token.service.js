const jwt = require("jsonwebtoken");
const UserDao = require("../dao/user.dao");
require("dotenv").config()


/**
 * @typedef {Object} AccessTokenContent
 * @property {string} id
 * @property {string} displayName
 * @property {Date} timestamp
*/

/**
 * @typedef {Object} RefreshTokenContent
 * @property {string} id
 * @property {Date} timestamp
*/

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_TIME = process.env.ACCESS_TOKEN_TIME || "1d";
const REFRESH_TOKEN_TIME = process.env.ACCESS_TOKEN_TIME || "1d";


/**
 *
 * @param {string} token
 * @returns {{type:string, token:string}}
*/
function parseToken(token) {
    // console.debug("parse : ", token);
    const x = token.split(' ');
    return !!x[1]
        ? { type: x[0], token: x[1] }
        : { type: "Unknown", token: token };
}

/**
 * @param {Object} tokenData
 * @param {number | string} exp expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
 * @returns {Promise<Token>}
 */
function createJwt(tokenData, exp) {
    return jwt.sign(tokenData, SECRET_KEY,
        {
            expiresIn: exp,
            algorithm: "HS256"
        }
    );
}

/**
 *
 * @param {string} userId
 * @returns {Promise<{accessToken:string, refreshToken:string}>}
 */
async function createTokenFromUserId(userId) {
    const user = await loadUserFromId(userId);
    const refreshTokenData = {
        id: user._id,
        timestamps: new Date()
    }

    const accessTokenData = {
        ...refreshTokenData,
        displayName: user.displayname,
    }
    return {
        accessToken: await createJwt(accessTokenData, ACCESS_TOKEN_TIME),
        refreshToken: await createJwt(refreshTokenData, REFRESH_TOKEN_TIME)
    }
}

async function loadUserFromId(id) {
    const user = await UserDao.findOne({ _id: id });
    if (!user)
        throw new Error("User Not Found");
    return user;
}

/**
 * @param {string} token
 * @returns {Promise<AccessTokenContent>}
*/
function verifyToken(token) {
    // console.debug("verify : ", token);
    const t = parseToken(token);
    return new Promise((resolve, reject) => {
        jwt.verify(t.token, SECRET_KEY, (err, decoded) => {
            if (err) {
                resolve(null)
            } else {
                resolve(decoded)
            }
        })

    });
}


module.exports.verifyToken = verifyToken;
module.exports.createTokenFromUserId = createTokenFromUserId;
module.exports.loadUserFromId = loadUserFromId
