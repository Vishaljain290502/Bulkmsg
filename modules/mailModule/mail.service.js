const mail = require("./mail.schema");


/** 
 * @description This function creates a new mail
 * @param {Object} mailData 
 * @return {Promise<mail>}
 * @author Vishal jain
 */
async function createmail(mailData) {
    return await mail.create(mailData);
}


/** 
 * @description This function returns mail by Id 
 * @param {ObjectId} id 
 * @return {Promise<mail>}
 * @author Vishal jain
 */
async function fetchmailById(id) {
    return await mail.findById(id);
}

/** 
 * @description This function returns all mails
 * @return {Promise<mail[]>}
 * @author Vishal jain
 */
async function fetchAllmails() {
    return await mail.find().populate("userId");
}

/** 
 * @description This function updates a mail by Id
 * @param {ObjectId} id 
 * @param {Object} updateData 
 * @return {Promise<mail>}
 * @author Vishal jain
 */
async function updatemailById(id, updateData) {
    return await mail.findByIdAndUpdate(id, updateData, { new: true });
}

/** 
 * @description This function deletes a mail by Id
 * @param {ObjectId} id 
 * @return {Promise<mail>}
 * @author Vishal jain
 */
async function deletemailById(id) {
    return await mail.findByIdAndDelete(id);
}

module.exports = {
    createmail,
    fetchmailById,
    fetchAllmails,
    updatemailById,
    deletemailById
};