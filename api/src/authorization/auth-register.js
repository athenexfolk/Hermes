const UserDao = require("../dao/user.dao");
const bcrypt = require("bcrypt")
const HTTP_STATUS = require('../core/value-object');
const { loadUserFromId } = require("../services/token.service")

/**
 * @typedef {object} RegisterData
 * @property {string} id
 * @property {string} displayname
 * @property {string} password
 * @property {string} avatar
 */


/**
 * @typedef {object} ResponsegisterData
 * @property {string} _id
 * @property {string} displayname
 * @property {string} avatar
 */



const registerEndpoint = async (req, res) => {
    const registerData = req.body
    await loadUserFromId(registerData.id).then(async () => {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            error: "Id already exists.",
            msg: "Choose a new Id or let it empty and try again."
        })

    }).catch(async () => {
        /** @type {ResponsegisterData} */
        const regisData = await createAccount(registerData)
        if (!regisData) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: "Unknown error creating account",
                msg: "Can not create account"
            })
        } else {
            res.status(HTTP_STATUS.CREATED).json({
                msg: "Create account successfully",
                data: {
                    id: regisData._id,
                    displayName: regisData.displayname,
                    avatar: regisData.avatar || null
                }
            });
        }
    })
}


/**
 * @param {RegisterData} registerData
 * @returns {Promise<RegisterData>}
 */

async function createAccount(registerData) {
    try {
        const passwordHash = bcrypt.hashSync(registerData.password, bcrypt.genSaltSync(10));
        const created = await new UserDao({
            _id: registerData.id,
            displayname: registerData.displayname,
            passwordHash: passwordHash,
            avatar: registerData.avatar || null
        }).save()
        return created
    } catch (err) {
        return false
    }
}

module.exports = registerEndpoint
