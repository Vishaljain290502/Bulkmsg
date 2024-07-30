const express = require('express');
const router = express.Router();
const userController = require('./user.controlller');

router.post('/createUser', userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUserById);


module.exports = router;