const express = require('express');
const router = express.Router();
const mailController = require('./mail.controller');

router.get('/getAllmails', mailController.getAllmails);
router.put('/sentMail/:id', mailController.sentMail);


module.exports = router;