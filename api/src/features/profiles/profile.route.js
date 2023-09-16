var express = require('express');
const getProfileFromToken = require('./from-token');
const authGuard = require('../../authorization/auth.middlewere');
const getProfileFromId = require('./from-id');
var router = express.Router();

/* GET /profile */
router.get('/',authGuard, getProfileFromToken);
/* GET /profile/:id */
router.get('/:id', getProfileFromId)

module.exports = router;

