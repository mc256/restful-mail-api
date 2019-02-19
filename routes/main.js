const express = require('express');
const router = express.Router();

const domain_ctrl  = require('./domain');
const forwarding_ctrl  = require('./forwarding');
const transport_ctrl  = require('./transport');
const user_ctrl  = require('./user');

router.use('/domain', domain_ctrl);
router.use('/forwarding', forwarding_ctrl);
router.use('/transport', transport_ctrl);
router.use('/user', user_ctrl);

module.exports = router;
