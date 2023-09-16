var express = require('express');
const getProfileFromToken = require('./from-token');
const authGuard = require('../../authorization/auth.middlewere');
const getProfileFromId = require('./from-id');
const patchDisplayNameEndpoint = require('./patch-display-name');
const patchAvatarEndpoint = require('./patch-avatar');
var router = express.Router();

/* GET /profile */
router.get('/',authGuard, getProfileFromToken);
/* GET /profile/:id */
router.get('/:id', getProfileFromId)
/* PATCH /profile/displayname/:displayname */
router.patch('/displayname/:displayname',authGuard, patchDisplayNameEndpoint);
/* PATCH /profile/avatar */
router.patch('/avatar',authGuard, patchAvatarEndpoint);

module.exports = router;

