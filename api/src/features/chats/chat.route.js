var express = require('express');
const authGuard = require('../../authorization/auth.middlewere');
const getChatHistory = require('./chat-history');
const contactEndpoint = require('./get-chats');
const addChatEndpoint = require('./add-chat');
var router = express.Router();

/* GET /profile */
router.get('/',authGuard, contactEndpoint);
router.post('/',authGuard, addChatEndpoint);
router.get('/:ref',authGuard, getChatHistory);

module.exports = router;
