const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  
      name:{type:String, required:true},
      description:{type:String,},
      tags:[{type:String,}],
      website: {type:String},
      contactInfo: {type:String},
      otherDetails: Map
})

const Company = mongoose.model.Company || mongoose.model("Company", companySchema);

module.exports = Company;
