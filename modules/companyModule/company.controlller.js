const express = require('express');
// const company = require('../models/companySchema');
const companyService = require('./company.service');

/**
 * @description Create a new company
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createcompany(req, res) {
    try {
        const { name , description} = req.body;

        const newcompany = await companyService.createCompany({ name, description });

        res.status(201).json({
            success: true,
            message: "company created successfully",
            company: newcompany
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
 * @description Get all companys
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllCompanys(req, res) {
    try {
        const companys = await companyService.fetchAllCompanys();
        res.status(200).json({
            success: true,
            companys: companys
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
 * @description Get a single company by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getcompanyById(req, res) {
    try {
        const company = await companyService.fetchCompanyById(req.params.id);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "company not found"
            });
        }
        res.status(200).json({
            success: true,
            company: company
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch company",
            error: error.message
        });
    }
}

/**
 * @description Update a company
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updatecompany(req, res) {
    try {
        const updatedcompany = await companyService.updateCompanyById(req.params.id, req.body);
        if (!updatedcompany) {
            return res.status(404).json({
                success: false,
                message: "company not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "company updated successfully",
            company: updatedcompany
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update company",
            error: error.message
        });
    }
}

/**
 * @description Delete a company
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deletecompany(req, res) {
    try {
        const deletedcompany = await companyService.deleteCompanyById(req.params.id);
        if (!deletedcompany) {
            return res.status(404).json({
                success: false,
                message: "company not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "company deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete company",
            error: error.message
        });
    }
}

module.exports = {
    createcompany,
    getAllCompanys,
    getcompanyById,
    updatecompany,
    deletecompany
};