const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String},
    role:{ type:String, default:"admin" },
  },
  { timestamps: true }
);

const Adminuser = mongoose.model('Adminuser', adminUserSchema);


module.exports = Adminuser;
