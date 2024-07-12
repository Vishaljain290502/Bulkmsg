const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({});


console.log(process.env.NODEMAILER_EMAIL);
console.log(process.env.NODEMAILER_PASSWORD);


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // true for 465
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  module.exports = transporter;