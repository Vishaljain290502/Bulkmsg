const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db');
const { sendEmail } = require('./sendMail');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodeCron = require('node-cron');
const mailService = require('./modules/mailModule/mail.service');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

nodeCron.schedule('*/30 * * * * *', async () => {
  try {
 const mails = await mailService.fetchMailToSend();
 console.log("mails",mails);
  for (i = 0; i < mails.length; i++){
    await sendEmail(mails[i].userId.email, mails[i].subject,mails[i].body);
    console.log(`Mail sent to ${mails[i].userId.email}`);
    mailService.updatemailById(mails[i]._id,{isSent:true});
  }
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

async function main() {
  await connectDB();

  app.use('/user', require('./modules/userModule/user.routes'));
  app.use('/company', require('./modules/companyModule/company.routes'));
  app.use('/mail', require('./modules/mailModule/mail.routes'));
  app.use('/admin', require('./modules/adminModule/admin.routes'));

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });

  // disconnectDB();
}

main().catch(err => console.error('Error in main function:', err));
