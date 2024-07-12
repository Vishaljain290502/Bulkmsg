const express = require('express');
const router = express.Router();
const mailController = require('./mail.controller');

router.get('/getAllmails', mailController.getAllmails);
router.put('/sendMail/:id', mailController.sentMail);


module.exports = router;