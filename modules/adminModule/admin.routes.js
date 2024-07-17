const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

router.post('/createUser', adminController.createUser)
router.post('/login', adminController.loginUser);


module.exports = router;