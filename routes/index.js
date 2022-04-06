const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.use('/user', user);

module.exports = router; // way to make return value avail rather than just code
