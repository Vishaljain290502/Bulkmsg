
// const transporter = require('./transporter');
const emailJS = require("@emailjs/browser");
const dotenv = require("dotenv");
const axios = require("axios");
const transporter = require('./transporter')

dotenv.config({});
const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: subject,
        text: text,
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {  
            if (error) {
                reject(error);                
            }
            resolve(info);
        });
    });
};

module.exports = { sendEmail };


