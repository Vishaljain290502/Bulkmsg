
// const transporter = require('./transporter');
const emailJS = require("@emailjs/browser");
const dotenv = require("dotenv");
const axios = require("axios");
const transporter = require('./transporter')

dotenv.config({});
// const data = {
//     service_id: "service_gankzw9",
//     template_id: "template_5fy0e9b",
//     user_id: "2eE4Am8NcHiGvjlG9",
//     template_params: {
//       employeeName: "Vishal Jain",
//       date: 1720109904354,
//       employerName: "Abhijeet Sharma",
//       message: "Hello Abhijeet Sir!\nThis is my EOD. I have done the following today:\n- Created deleteUserChat API for HaulerMate\n- Resolved issues suggested by Tarannum\n- Created bulk message functions\n- Created notification APIs"
//     }
//   };

// async function sendMail(email,subject,text){
//     const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
//         headers: {
//           'Content-Type': 'application/json',
//           'User-Agent': 'axios/1.7.2'
//         }
//       })
//       console.log(response.data);
//     }

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


// const fetchAndSendEmail = async () => {
//     try {
//         const emailData = await AI();
//         if (emailData) {
//             const { email, subject, text } = emailData;
//             sendEmail(email, subject, text);
//         } else {
//             console.log("No email data received from AI.");
//         }
//     } catch (error) {
//         console.error("Error fetching email data from AI:", error);
//     }
// };

// const sendNextEmail = () => {
//     if (emailIndex < emailData.length) {
//         const { email, subject, text } = emailData[emailIndex];
//         sendEmail(email, subject, text);
//         emailIndex++;
//     } else {
//         console.log("All emails have been sent.");
//         clearInterval(emailInterval);  
//     }
// };

// setInterval(sendNextEmail,fetchAndSendEmail, 5000);
