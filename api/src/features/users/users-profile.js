const HTTP_STATUS = require("../../core/value-object");
const { loadUserFromId } = require("../../services/token.service")

/**
 * @typedef {object} AllUserData
 * @property {string} username
 * @property {string} avatar
 * @property {string} displayName
 */

/* GET users ID. */
const usersProfileEndpoint = async (req, res) => {
    await loadUserFromId(req.params.id).then((user) => {
        res.status(HTTP_STATUS.FOUND).json({
            msg: "Found Content",
            user: {
                username: user._id,
                avatar: user.avatar,
                displayname: user.displayname
            }
        });
    }).catch((e) => {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            error: `${e.message} | ${req.params.id}`,
            msg: "Try to input other Id"
        })
    });
};


module.exports = usersProfileEndpoint
