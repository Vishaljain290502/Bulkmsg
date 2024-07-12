const express = require('express');
// const User = require('../models/userSchema');
const userService = require('./user.service');
const userModel = require("./user.schema");


/**
 * @description Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createUser(req, res) {
    console.log("userModel",userModel);
    try {
        const { name, email, company } = req.body;
        const newUser = await userService.createUser({ name, email, company });
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
/**
 * @description Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
    try {
        const users = await userService.fetchAllUsers();
        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        });
    }
}

/**
 * @description Get a single user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getUserById(req, res) {
    try {
        const user = await userService.fetchUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message
        });
    }
}

/**
 * @description Update a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateUser(req, res) {
    try {
        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
}

/**
 * @description Delete a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteUser(req, res) {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};