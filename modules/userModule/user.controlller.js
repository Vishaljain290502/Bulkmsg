const express = require("express");
// const User = require('../models/userSchema');
const userService = require("./user.service");
const companyService = require("../companyModule/company.service");
const mailService = require("../mailModule/mail.service");
const userModel = require("./user.schema");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateMail(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Extract first sentence or a specific number of characters for subject
    const subject = text.split(".")[0] || text.substring(0, 50); // Adjust length as needed

    return { subject }; // Only return the subject
  } catch (error) {
    console.error("Error generating content:", error.message, error.stack);
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
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to create user",
      });
    }
    const company = await companyService.fetchCompanyById(user.company);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch company",
      });
    }
    const subjectPrompt = `Generate one single line email subject for this information Company name: ${company.name} Company description: ${company.description}`;
    const subjectResult = await generateMail(subjectPrompt);
    const subject = typeof subjectResult === "string" ? subjectResult : subjectResult.subject;
    
    const bodyPrompt = `Generate a professional email body based on the following user and company information:
    User: ${user.name}, ${user.email}
    Company: ${company.name}, ${company.description}
    The email should introduce the company's relevant services, address the user's potential needs based on the subject, and include a compelling call to action. The body should not include the subject line.`;
    const bodyResult = await generateMail(bodyPrompt);
    const body = typeof bodyResult === "string" ? bodyResult : bodyResult.body;
    
    await mailService.createmail({ userId: user._id, subject, body });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: error.message,
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
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
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
    const updatedUser = await userService.updateUserById(
      req.params.id,
      req.body
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
}

/**
 * @description Delete a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteUserById(req, res) {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
