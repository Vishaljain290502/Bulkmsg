const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isMailSent: { type: Boolean, default: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    firstMailSentOn: { type: Date },
    secondMailSentOn: { type: Date },
    thirdMailSentOn: { type: Date },
    position: {type:String},
    mails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mail' }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// async function fetchUser(matchBody) {
//   const user = await User.findOne(matchBody);
//   return user;
// }

module.exports = User;
