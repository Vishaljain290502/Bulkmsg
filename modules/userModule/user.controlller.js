const express = require("express");
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

    return text; // Return the generated text directly
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

    // const subjectPrompt = `Generate one liner email subject with high opening rate for this information ${company.description}`;

    const bodyPrompt = ` An ISO-certified and DIPP-recognized by the Government of India, Aurasoft stands at the forefront of technological advancement.
At Aurasoft, we’re more than developers – we’re your strategic partners in digital transformation. Our AI-powered approach accelerates development lifecycles, enabling faster time-to-market and robust solutions tailored to your unique needs.
We are providing
Website development
web app development
mobile app development
Cloud solutions
Saas Solution
AWS services
GCP Services
Data Analytics
Data Visualization
Power BI
BI Dashboarding
We also serve across these Industries
Real Estate
Eduacation
Fitness & Wellness
Beauty 
Healthcare
Ecommerce

This information is our Company website 

And This is the iformation of our Targeted Company
    Based on the following user and company information, understand their services & offerings and generate a professional sales email body on behalf of Aurasoft that can help them to achieve their digital goals in the space of Web & Mobility, SaaS, MVP, Cloud Solutions & Reengineering with emerging techs.
The email should introduce the Aurasoft's relevant services, address the user's potential needs based on the subject, and include a compelling call to action. The body should not include the subject line
    user: ${user.name}
    company deacription: ${company.description}
    Generate small and relevant to the service we provided and git ve one Discover a call
    we dont want subject inside the body.
    `;
    const body = await generateMail(bodyPrompt);
    const subject = await generateMail(
      `Generate a subject line for this given body ${body},only give a single string`

    );
    console.log("subject", subject);
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
    const deletedUser = await userService.deleteUserById(req.params.id);
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
