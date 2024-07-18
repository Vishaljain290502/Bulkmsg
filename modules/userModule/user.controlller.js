const express = require('express');
// const User = require('../models/userSchema');
const userService = require('./user.service');
const companyService = require('../companyModule/company.service');
const mailService = require('../mailModule/mail.service')
const userModel = require("./user.schema");

const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateMail(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
  
      // Extract first sentence or a specific number of characters for subject
      const subject = text.split('.')[0] || text.substring(0, 50); // Adjust length as needed
  
      return { subject }; // Only return the subject
  
    } catch (error) {
      console.error('Error generating content:', error.message, error.stack);
      throw error;
    }
  }

/**
 * @description Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        
        const company = await companyService.fetchCompanyById(user.company);
        
        const subjectPrompt = `Create a catchy and engaging email subject in single line and give subjets in array  using the following information:
                                Company Name: ${company.name}
                                User Name: ${user.name}
                                Company Description: ${user.description}
                                The subject line should be attractive, relevant to the company, and personalized for the user.`;

        const subject = (await generateMail(subjectPrompt)); // Call modified generateMail

        const bodyPrompt = `Generate a professional email body based on the following subject, user, and company information:\n\nSubject: ${subject}\nUser: ${user.name}, ${user.email}\nCompany: ${company.name}, ${company.description}\n\nThe email should introduce the company's relevant services, address the user's potential needs based on the subject, and include a compelling call to action.`;

        const body = await generateMail(bodyPrompt);

        await mailService.createmail({userId:user._id,body,subject})
        
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
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
    deleteUser,
};