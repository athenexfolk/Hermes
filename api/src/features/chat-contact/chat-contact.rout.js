const express = require("express")
const contactEndpoint = require("./chat-contact")
const authGuard = require("../../authorization/auth.middlewere")
var router = express.Router()


/* GET contacts User*/
router.get("/contacts", authGuard, contactEndpoint);

module.exports = router
