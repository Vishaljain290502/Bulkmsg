

const Admin = require("./admin.schema");/** 
 * @description This function creates a new user
 * @param {Object} userData 
 * @return {Promise<User>}
 * @author Vishal jain
 */

async function findUserByEmail(email) {
    return await Admin.findOne({ email });
}

/** 
 * @description This function creates a new user
 * @param {Object} userData 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function createUser(userData) {
    return await Admin.create(userData);
}

module.exports = {
    findUserByEmail,
    createUser
}