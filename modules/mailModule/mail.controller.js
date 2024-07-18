const Mail = require('./mail.schema')
const mailservice = require('./mail.service');

async function getAllmails(req, res) {
    try {
        const mails = await mailservice.fetchAllmails();
        res.status(200).json({
            success: true,
            mails: mails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        });
    }
};

async function sentMail(req, res)  {
    const mailId = req.params.id;
    try {
      const mail = await Mail.findByIdAndUpdate(mailId, { shouldSent: true }, { new: true });
  
      if (!mail) {
        return res.status(404).json({ message: 'Mail not found' });
      }
  
      res.status(200).json(mail);
    } catch (error) {
      res.status(500).json({ message: 'Error updating mail', error });
    }
};

module.exports = {
    getAllmails,
    sentMail
}

