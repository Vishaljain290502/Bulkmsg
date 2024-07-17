const express = require('express');

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

        const isMatch = await user.password;

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

      

        res.status(200).json({
            success: true,
            message: 'Login successful'
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
        const user = await userService.findUserByEmail(email);

        if (user) {
            return res.status(404).json({status:404, message: 'Email already in use' });
        }
        const newUser = await userService.createUser({ name, email , password });
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