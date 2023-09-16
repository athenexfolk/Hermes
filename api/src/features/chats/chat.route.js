var express = require('express');
const authGuard = require('../../authorization/auth.middlewere');
const getChatHistory = require('./chat-history');
const contactEndpoint = require('./get-chats');
var router = express.Router();

/* GET /profile */
router.get('/',authGuard, contactEndpoint);
router.get('/:ref',authGuard, getChatHistory);

module.exports = router;
