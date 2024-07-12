
const mongoose = require('mongoose');

async function connectDB() {
return new Promise((resolve,reject)=>{
        mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
       });
       mongoose.connection.on("connected",()=>{
         console.log("Database connected Successfully");
         resolve();
       });
       mongoose.connection.on("error",(err)=>{
        console.log(err,"Database not Connected");
        reject(err);
       });
});
};

function disconnectDB(){
  mongoose.disconnect();
}

module.exports = {connectDB,disconnectDB};