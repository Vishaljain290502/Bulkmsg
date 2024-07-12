const express = require('express');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('./db');
const { fetchUser } = require('./modules/userModule/user.schema'); // Ensure this path is correct
const { sendEmail } = require('./sendMail');
const userRoutes = require('./modules/userModule/user.routes');
const companyRoutes = require('./modules/companyModule/company.routes');
const mailRoutes = require('./modules/mailModule/mail.routes');

dotenv.config();

const app = express();
app.use(express.json());

async function main() {
  await connectDB();

  // const user = await fetchUser({});
  // if (user) {
  //   sendEmail(
  //     user.email,
  //     'EOD Report',
  //     `Hello Abhijeet Sir!
  //      This is My Eod Ihave Done today
  //      1. Create deleteUserChat api for haulerMate 
  //      2. Change Some Issues in Apis which suggested tarannum
  //      3. create Bulk message functions
  //      4. create notification Apis`
  //   );
  // }

  app.use('/user', userRoutes);
  app.use('/company', companyRoutes);
  app.use('/mail', mailRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });

  // disconnectDB();
}

main().catch(err => console.error('Error in main function:', err));
