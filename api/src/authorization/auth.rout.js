var express = require('express');
var router = express.Router();
var jwtRefreshTokenValidate = require("./auth-refresh")
var jwt = require("jsonwebtoken");
const loginEndpoint = require('./auth-login');
const registerEndpoint = require("./auth-register")

router.post('/register', registerEndpoint);
router.get("/login", loginEndpoint);
router.get("/token/refresh", jwtRefreshTokenValidate)

module.exports = router;
