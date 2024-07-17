const express = require('express');
const bcrypt = require('bcryptjs');
const userService = require('./admin.service');
const userModel = require("./admin.schema");

/**
 * @description Login a user and return a JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

       

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

/**
 * @description Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userService.createUser({ name, email, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


module.exports = {
    loginUser,
    createUser
};