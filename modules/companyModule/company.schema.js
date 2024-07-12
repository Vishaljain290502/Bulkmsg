const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  
      name:{type:String, required:true},
      description:{type:String,},
      tags:[{type:String,}],
})

const Company = mongoose.model.Company || mongoose.model("Company", companySchema);

module.exports = Company;