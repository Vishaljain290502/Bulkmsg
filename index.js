const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, disconnectDB } = require('./db');
const { fetchUser } = require('./modules/userModule/user.schema'); 
const { sendEmail } = require('./sendMail');
const userRoutes = require('./modules/userModule/user.routes');
const companyRoutes = require('./modules/companyModule/company.routes');
const mailRoutes = require('./modules/mailModule/mail.routes');
const adminRoutes = require('./modules/adminModule/admin.routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// nodeCron.schedule('*/30 * * * * *', async () => {
//   try {
//     const generatedSubject = await generateMail('');
//     const generatedText = await generateMail('');

//     await sendEmail('recipient@example.com', Subject, Text);

//     console.log('Email sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// });


async function main() {
  await connectDB();


  app.use('/user', userRoutes);
  app.use('/company', companyRoutes);
  app.use('/mail', mailRoutes);
  app.use('/admin', adminRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });

  // disconnectDB();
}

main().catch(err => console.error('Error in main function:', err));
