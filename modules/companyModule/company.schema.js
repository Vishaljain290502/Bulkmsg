const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  
      name:{type:String, required:true},
      description:{type:String,},
      email: { type: String },
      socialProfile:{ type: String },
      website: { type: String },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
          default: [0, 0],
        },
      },
      Address: { type: String },
      tags:[{type:String,}],
      website: {type:String},
      contactInfo: {type:String},
      otherDetails: Map,
      numberOfEmployees: {
            type: String,
            // enum: ["0-10", "10-15", "15-20", "20-25", "25+"],
            required: true,
          },
})

const Company = mongoose.model.Company || mongoose.model("Company", companySchema);

module.exports = Company;
