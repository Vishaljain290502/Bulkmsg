const express = require('express');
const router = express.Router();
const companyController = require('./company.controlller');

router.post('/createCompany', companyController.createcompany);
router.get('/getAllCompanys', companyController.getAllCompanys);
router.get('/company/:id', companyController.getcompanyById);
router.put('/updateCompany/:id', companyController.updatecompany);
router.delete('/delete/:id', companyController.deletecompany);

module.exports = router;

  
