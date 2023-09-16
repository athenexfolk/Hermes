var express = require('express');
var router = express.Router();
var jwtRefreshTokenValidate = require("./auth-refresh")
var jwt = require("jsonwebtoken");
const loginEndpoint = require('./auth-login');
const registerEndpoint = require("./auth-register")

/**
 * @typedef {Object} RegisterData
 * @property {string} id
 * @property {string} displayName
 * @property {string} password
 */
router.post('/register', registerEndpoint);


/**
 * @typedef {Object} LoginDto
 * @property {string} id
 * @property {string} password
 * @property {"login"} action
 */
router.get("/login/token", loginEndpoint);

router.get("/token/refresh", jwtRefreshTokenValidate)


/**
 * @param {string} id
 * @returns {Promise<boolean>}
 */


/**
 * @param {RegisterData} registerData
 * @returns {Promise<boolean>}
 */


/**
 * @typedef {Object} Token
 * @property {string} tokenType
 * @property {string} acessToken
 * @property {string} refreshToken
 * @property {number} expirein
 */

module.exports = router;


