const HTTP_STATUS = require("../../core/value-object");
const UserDao = require("../../dao/user.dao");

/**
 * @typedef {Object} UserResponseDto
 * @property {string} userid
 * @property {string} username
 * @property {string} avatar
 * @property {string} displayname
 */

function getProfileFromToken(req, res, next) {
    console.assert(!!req.sub, "You must provide u sub");

    loadProfile(req.sub)
        .then(mapModel)
        .then(profile => res.json(profile))
        .catch(next);
}

async function loadProfile(userid) {
    const usr = await UserDao.findOne(
        { _id: userid },
        { passwordHash: 0, passwordSalt: 0 }
    );
    if (!usr) throw {
        error:"Profile not found",
        msg: `User id '${userid}' have no profile. You can register a new profile`
    }
    return usr;
}

async function mapModel(usr) {
    return {
        userid: usr._id,
        username: usr._id,
        avatar: usr.avatar,
        displayname: usr.displayname
    }
}


module.exports = getProfileFromToken;
