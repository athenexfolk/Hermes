
var express = require('express');
var usersProfileEndpoint = require("./users-profile")
var router = express.Router();

/* GET users listing. */
router.get('/:id', usersProfileEndpoint)

module.exports = router;
