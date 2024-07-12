const companyModel = require("./company.schema");

/** 
 * @description This function creates a new user
 * @param {Object} userData 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function createCompany(companyData) {
    return await companyModel.create(companyData);
}

/** 
 * @description This function returns user by Id 
 * @param {ObjectId} id 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function fetchCompanyById(id) {
    return await companyModel.findById(id);
}

/** 
 * @description This function returns all users
 * @return {Promise<User[]>}
 * @author Vishal jain
 */
async function fetchAllCompanys() {
    return await companyModel.find();
}

/** 
 * @description This function updates a user by Id
 * @param {ObjectId} id 
 * @param {Object} updateData 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function updateCompanyById(id, updateData) {
    return await companyModel.findByIdAndUpdate(id, updateData, { new: true });
}

/** 
 * @description This function deletes a user by Id
 * @param {ObjectId} id 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function deleteCompanyById(id) {
    return await companyModel.findByIdAndDelete(id);
}

module.exports = {
    createCompany,
    fetchCompanyById,
    fetchAllCompanys,
    updateCompanyById,
    deleteCompanyById
};