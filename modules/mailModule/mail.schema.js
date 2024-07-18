const mongoose = require('mongoose');
const  { Schema } = mongoose;

const mailSchema = new Schema({
    subject:{type:String, trim:true },
    body: { type:String, trim:true },
    userId:{  type: mongoose.Schema.Types.ObjectId,
    ref: "User",},
    shouldSent:{type:Boolean, default:false},
    isSent:{type:Boolean, default:false},
},{timestamps:true})

const Mail = mongoose.model.Mail || mongoose.model("Mail", mailSchema);

module.exports = Mail;