const User = require("./user.schema");

/** 
 * @description This function finds user by email
 * @param {string} email 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function findUserByEmail(email) {
    return await User.findOne({ email });
}
/** 
 * @description This function creates a new user
 * @param {Object} userData 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function createUser(userData) {
    return await User.create(userData);
}


/** 
 * @description This function returns user by Id 
 * @param {ObjectId} id 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function fetchUserById(id) {
    return await User.findById(id);
}

/** 
 * @description This function returns all users
 * @return {Promise<User[]>}
 * @author Vishal jain
 */
async function fetchAllUsers() {
    return await User.find();
}

/** 
 * @description This function updates a user by Id
 * @param {ObjectId} id 
 * @param {Object} updateData 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function updateUserById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
}

/** 
 * @description This function deletes a user by Id
 * @param {ObjectId} id 
 * @return {Promise<User>}
 * @author Vishal jain
 */
async function deleteUserById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    findUserByEmail,
    createUser,
    fetchUserById,
    fetchAllUsers,
    updateUserById,
    deleteUserById
};